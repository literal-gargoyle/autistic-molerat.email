const STORAGE_PREFIX = "esoteric-sandbox-";

export function saveCode(language: string, code: string): void {
  localStorage.setItem(`${STORAGE_PREFIX}${language}`, code);
}

export function loadCode(language: string): string | null {
  return localStorage.getItem(`${STORAGE_PREFIX}${language}`);
}
