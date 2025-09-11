export function convertToSlug(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/_/g, '-')              // replace underscores with dashes
      .replace(/\s+/g, '-')            // replace spaces with dashes
      .replace(/[^a-z0-9-]/g, '')      // remove invalid characters
      .replace(/--+/g, '-')            // collapse multiple dashes
      .replace(/^-+|-+$/g, '');        // trim leading/trailing dashes
  }
  
