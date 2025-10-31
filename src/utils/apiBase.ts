export const API_BASE_URL = "https://enkuapi.pro.et";

export function buildApiUrl(path: string = ""): string {
  return `${API_BASE_URL}${path}`;
}

export function buildFileUrl(path: string = ""): string {
  return `${API_BASE_URL}/files/${path}`;
}


