// Custom implementation to replace clsx and tailwind-merge
type ClassValue = string | undefined | null | false | { [key: string]: boolean } | ClassValue[];

function mergeClasses(inputs: ClassValue[]): string {
  const regularClasses = new Set<string>();
  const utilityClasses = new Map<string, string>();
  const classOrder: string[] = [];
  
  function processValue(value: ClassValue) {
    if (!value) return;
    
    if (typeof value === 'string') {
      value.split(' ').forEach(cls => {
        if (!cls) return;
        const trimmedClass = cls.trim();
        
        // Check if it's a Tailwind utility class
        const match = trimmedClass.match(/^([a-z]+(?:-[a-z]+)*(?:[:][a-z]+)?)-/);
        if (match) {
          const prefix = match[1];
          utilityClasses.set(prefix, trimmedClass);
          if (!classOrder.includes(prefix)) {
            classOrder.push(prefix);
          }
        } else {
          if (!regularClasses.has(trimmedClass)) {
            regularClasses.add(trimmedClass);
            classOrder.push(trimmedClass);
          }
        }
      });
    } else if (Array.isArray(value)) {
      value.forEach(processValue);
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([key, val]) => {
        if (val) {
          const match = key.match(/^([a-z]+(?:-[a-z]+)*(?:[:][a-z]+)?)-/);
          if (match) {
            const prefix = match[1];
            utilityClasses.set(prefix, key);
            if (!classOrder.includes(prefix)) {
              classOrder.push(prefix);
            }
          } else {
            if (!regularClasses.has(key)) {
              regularClasses.add(key);
              classOrder.push(key);
            }
          }
        }
      });
    }
  }

  // Process inputs in order
  inputs.forEach(processValue);

  // Build final class string maintaining order
  return classOrder
    .map(key => {
      if (utilityClasses.has(key)) {
        return utilityClasses.get(key);
      }
      return regularClasses.has(key) ? key : null;
    })
    .filter(Boolean)
    .join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return mergeClasses(inputs);
} 