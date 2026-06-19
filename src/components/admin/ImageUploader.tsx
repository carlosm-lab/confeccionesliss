"use client";
import { useState, useRef, useEffect } from "react";
import NextImage from "next/image";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  currentImage: string | null;
  onRemoveImage: () => void;
}

export default function ImageUploader({
  onUploadSuccess,
  currentImage,
  onRemoveImage,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMounted = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxCompressedSize = 2 * 1024 * 1024; // 2MB post-compresión

  /**
   * Comprime la imagen y elimina metadata EXIF (privacidad).
   * El canvas strip automáticamente toda la info de ubicación GPS.
   */
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        URL.revokeObjectURL(img.src);
        let { width, height } = img;
        const maxDim = 1600;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0, width, height);

        const sizeMB = file.size / (1024 * 1024);
        let quality =
          sizeMB > 8 ? 0.55 : sizeMB > 4 ? 0.65 : sizeMB > 2 ? 0.72 : 0.8;

        const tryCompress = (q: number): Promise<Blob | null> =>
          new Promise((res) =>
            canvas.toBlob((blob) => res(blob), "image/webp", q)
          );

        try {
          let blob = await tryCompress(quality);
          while (blob && blob.size > maxCompressedSize && quality > 0.3) {
            quality -= 0.1;
            blob = await tryCompress(quality);
          }
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }

          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, "") + ".webp",
            { type: "image/webp", lastModified: Date.now() }
          );
          resolve(compressedFile);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () =>
        reject(new Error("Error loading image for compression"));
    });
  };

  const processFile = async (file: File) => {
    setError(null);

    if (!acceptedTypes.includes(file.type)) {
      setError("Formato no soportado. Usa JPG, PNG, WEBP o GIF.");
      return;
    }

    // SEC-007: validar tamaño antes de subir (5MB = límite del bucket Supabase)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `La imagen es demasiado grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Máximo: 5MB.`
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      const compressedFile = await compressImage(file);
      setUploadProgress(40);

      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
      const supabase = getSupabaseClient();

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, compressedFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/webp",
        });

      if (uploadError) throw uploadError;
      setUploadProgress(80);

      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(fileName);

      setUploadProgress(100);
      onUploadSuccess(publicUrl);
    } catch (err: unknown) {
      logger.error("Error uploading image:", err);
      const error = err as { statusCode?: number; message?: string };
      if (
        error.statusCode === 403 ||
        error.message?.toLowerCase().includes("permission")
      ) {
        setError(
          "Error 403: No tienes permisos para subir archivos. Sesión expirada."
        );
      } else if (
        error.statusCode === 404 ||
        error.message?.includes("Bucket")
      ) {
        setError("Error 404: El bucket de imágenes no existe.");
      } else {
        setError(
          `Error al subir imagen: ${error.message || "Error de red desconocido."}`
        );
      }
    } finally {
      setIsUploading(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (isMounted.current) setUploadProgress(0);
      }, 1000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      {currentImage ? (
        <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:aspect-square md:aspect-video dark:border-white/5 dark:bg-transparent">
          <NextImage
            src={currentImage}
            alt="Vista previa"
            fill
            className="object-contain"
            unoptimized
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={onRemoveImage}
              className="flex items-center gap-2 rounded-full bg-red-600 p-2 px-4 text-white shadow-md transition-colors hover:bg-red-700"
            >
              <span className="material-symbols-outlined text-[18px]">
                delete
              </span>
              <span className="text-sm font-bold">Cambiar Imagen</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors md:p-10 ${isUploading ? "border-primary bg-primary/5" : "hover:border-primary/50 border-slate-300 bg-white hover:bg-slate-50 dark:border-white/5 dark:bg-white/5 dark:hover:bg-white/10"}`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            !isUploading &&
            fileInputRef.current?.click()
          }
          role="button"
          tabIndex={0}
          aria-label="Subir imagen: haz clic o arrastra"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/jpeg, image/png, image/webp, image/gif"
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex w-full max-w-[200px] flex-col items-center">
              <span className="material-symbols-outlined text-primary mb-2 animate-bounce text-4xl">
                cloud_upload
              </span>
              <p className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                Subiendo imagen...
              </p>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined mb-3 text-4xl text-slate-400">
                add_photo_alternate
              </span>
              <p className="mb-1 text-sm font-bold text-slate-700 dark:text-slate-300">
                Haz clic o arrastra tu imagen aquí
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                JPG, PNG, WEBP o GIF — se comprime automáticamente
              </p>
            </>
          )}
        </div>
      )}
      {error && (
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-red-500">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
}
