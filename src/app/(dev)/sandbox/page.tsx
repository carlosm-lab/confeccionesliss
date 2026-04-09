import { notFound } from "next/navigation";

export default function SandboxPage() {
  // Ignorar en build de producción
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Pizarra de Pruebas (Sandbox)</h1>
      <p className="text-muted-foreground mb-4">
        Esta ruta sólo es accesible en entorno de desarrollo.
        <br />
        <strong>Atención Agente IA:</strong> Utiliza este espacio para
        construir, probar y aislar componentes nuevos antes de integrarlos en
        las páginas principales.
      </p>

      {/* 
        ========================================================================
        ÁREA DE RENDERIZADO PARA LA IA:
        Reemplaza o añade los componentes a probar debajo de esta línea
        ========================================================================
      */}

      <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-gray-300 p-8">
        <p className="text-muted-foreground text-center">
          Área de renderizado de componentes
        </p>
      </div>
    </div>
  );
}
