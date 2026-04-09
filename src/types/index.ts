/**
 * Tipos TypeScript compartidos a nivel global.
 * Define aquí interfaces y types que se reutilicen en múltiples capas
 * (componentes, actions, hooks, etc.) para evitar duplicación.
 */

/** Respuesta genérica de API */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

/** Parámetros de paginación */
export interface PaginationParams {
  page: number;
  limit: number;
}

/** Resultado paginado */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}
