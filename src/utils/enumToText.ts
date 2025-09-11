  export function enumToText(enumValue: string): string {
    return enumValue
      .trim()
      .replace('_'," ").toLowerCase(); // replace dashes with underscores
  }
  
