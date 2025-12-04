export function formatDate(date: Date, dateFormat: string, locale: string): string {
  const options: Intl.DateTimeFormatOptions = {};

  if (dateFormat.includes('MMMM')) {
    options.month = 'long';
  } else if (dateFormat.includes('MMM')) {
    options.month = 'short';
  } else if (dateFormat.includes('MM')) {
    options.month = '2-digit';
  }

  if (dateFormat.includes('dd')) {
    options.day = '2-digit';
  }

  if (dateFormat.includes('yyyy')) {
    options.year = 'numeric';
  } else if (dateFormat.includes('yy')) {
    options.year = '2-digit';
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}
