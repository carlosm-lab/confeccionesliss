# Reglas de Git y Despliegue para Confecciones Liss

- **Rama de Producción/Despliegue Obligatoria**: La única rama válida para commits, fusiones y despliegues en este repositorio es `master`.
- **Prohibición de `main`**: Está estrictamente prohibido realizar commits directos o push a la rama `main` o a cualquier otra rama que no sea `master` para despliegues, a menos que el usuario lo solicite explícitamente.
- **Antes de hacer commit/push**: Asegúrate siempre de estar en la rama `master` (`git checkout master`). Si por alguna razón estás en otra rama, fusiona tus cambios a `master` antes de realizar el push.
