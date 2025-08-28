export function enumToOptions<T extends object>(enumObj: T): { value: string; label: string }[] {
    return Object.entries(enumObj).map(([key, value]) => ({
      value: value as string,
      label: formatLabel(key)
    }));
  }
  
  /**
   * Format enum key into human-readable label
   * - Splits CamelCase and capitalizes each word
   */
  function formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1') // Split on uppercase letters
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  }