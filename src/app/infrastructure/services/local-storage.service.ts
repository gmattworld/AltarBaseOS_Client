import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Save item to localStorage
   * @param key Storage key
   * @param value Value to store
   * @throws Error if storage is not available or operation fails
   */
  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        throw new Error(`Failed to set item in localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  /**
   * Retrieve item from localStorage
   * @param key Storage key
   * @returns Stored value or null if not found
   * @throws Error if storage is not available
   */
  getItem(key: string): string | null {
    if (this.isBrowser) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        throw new Error(`Failed to get item from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    return null;
  }

  /**
   * Remove item from localStorage
   * @param key Storage key
   * @throws Error if storage is not available or operation fails
   */
  removeItem(key: string): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        throw new Error(`Failed to remove item from localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  /**
   * Clear all localStorage
   * @throws Error if storage is not available or operation fails
   */
  clear(): void {
    if (this.isBrowser) {
      try {
        localStorage.clear();
      } catch (error) {
        throw new Error(`Failed to clear localStorage: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  }

  /**
   * Check if localStorage is available
   * @returns true if localStorage is available
   */
  isAvailable(): boolean {
    return this.isBrowser;
  }
}
