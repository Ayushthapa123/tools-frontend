export function getFormattedDate(unformattedDate: string): string {
  const date = new Date(Number(unformattedDate)*1000);

  if (isNaN(date.getTime())) {
    return 'Invalid Date'; // Returns this if the input date is invalid
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}
