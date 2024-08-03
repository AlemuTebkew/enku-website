// src/utils/storage.ts
import { v4 as uuidv4 } from 'uuid';

export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

export const generateSessionId = (): string => {
  return uuidv4();
};