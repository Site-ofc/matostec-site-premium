/**
 * Helpers de caminho para o site funcionar tanto na raiz (preview)
 * quanto no subdiretório do GitHub Pages (/matostec-site-premium/).
 */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Caminho de rota interna, ex.: link("/modelo-1"). */
export function link(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${BASE}${path}` || "/";
}

/** Caminho de arquivo em /public, ex.: asset("/assets/foto.webp"). */
export function asset(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${BASE}${path}`;
}
