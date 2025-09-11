export function slugToEnum(slug: string): string {
    return slug
      .trim()
      .replace(/-/g, '_').toUpperCase(); // replace dashes with underscores
  }
  
