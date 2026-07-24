"use client";

import { Icon } from "@/components/ui/icons/Icon";
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

  const acceptedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/heic",
    "image/heif",
  ];
  const maxCompressedSize = 4 * 1024 * 1024; // 4MB post-compresión (calidad prioritaria)

  /**
   * Comprime la imagen y elimina metadata EXIF (privacidad).
   * Usa createImageBitmap de forma asíncrona para mayor compatibilidad y velocidad,
   * con fallback a HTMLImageElement y fallback final al archivo original si la compresión falla.
   */
  const compressImage = async (file: File): Promise<File> => {
    try {
      let width = 0;
      let height = 0;
      let drawSource: CanvasImageSource | null = null;
      let cleanup: (() => void) | null = null;

      if (typeof window !== "undefined" && "createImageBitmap" in window) {
        try {
          const bitmap = await createImageBitmap(file);
          width = bitmap.width;
          height = bitmap.height;
          drawSource = bitmap;
          cleanup = () => bitmap.close();
        } catch {
          // Si createImageBitmap no soporta el formato específico, pasa al fallback HTMLImageElement
        }
      }

      if (!drawSource) {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () =>
            reject(new Error("No se pudo cargar la imagen para compresión"));
          img.src = objectUrl;
        });
        width = img.width;
        height = img.height;
        drawSource = img;
        cleanup = () => URL.revokeObjectURL(objectUrl);
      }

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
      if (!ctx) throw new Error("Contexto de Canvas 2D no disponible");
      ctx.drawImage(drawSource, 0, 0, width, height);

      if (cleanup) cleanup();

      const quality = 0.9;
      const tryCompress = (q: number): Promise<Blob | null> =>
        new Promise((res) =>
          canvas.toBlob((blob) => res(blob), "image/webp", q)
        );

      let blob = await tryCompress(quality);
      let currentQuality = quality;
      while (blob && blob.size > maxCompressedSize && currentQuality > 0.65) {
        currentQuality -= 0.05;
        blob = await tryCompress(currentQuality);
      }

      if (!blob) {
        return file;
      }

      return new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
        type: "image/webp",
        lastModified: Date.now(),
      });
    } catch (err) {
      logger.warn(
        "[compressImage] Fallback al archivo original debido a:",
        err
      );
      return file;
    }
  };

  const processFile = async (file: File) => {
    setError(null);

    const fileType = file.type.toLowerCase();
    const isAcceptedType =
      acceptedTypes.includes(fileType) ||
      /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name);

    if (!isAcceptedType) {
      setError("Formato no soportado. Usa JPG, PNG, WEBP o GIF.");
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
              <Icon name="delete" size={18} />
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
              <Icon
                name="cloud_upload"
                size={36}
                className="text-primary mb-2 animate-bounce text-4xl"
              />
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
              <Icon
                name="add_photo_alternate"
                size={36}
                className="mb-3 text-slate-400"
              />
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
          <Icon name="error" size={14} />
          {error}
        </p>
      )}
    </div>
  );
}
