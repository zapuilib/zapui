export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function convertColorToRgb(color: string): string {
  if (color.startsWith('#')) {
    return hexToRgb(color);
  } else if (color.startsWith('rgb')) {
    return rgbToRgbNumber(color);
  } else if (color.startsWith('rgba')) {
    return rgbaToRgbNumber(color);
  }
  return '';
}

export function convertColorToHex(color: string): string {
  if (color.startsWith('#')) {
    return color;
  } else if (color.startsWith('rgb')) {
    return rgbToHex(color);
  } else if (color.startsWith('rgba')) {
    return rgbToHex(hexToRgba(color, 1));
  } else {
    return rgbNumberToHex(color);
  }
  return '';
}

export function hexToRgba(hex: string, alpha: number): string {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


export function hexToRgb(hex: string): string {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `${r}, ${g}, ${b}`;
}

export function rgbToRgbNumber(rgb: string): string {
  const result = rgb.match(/\d+/g);
  return result ? `${result[0]}, ${result[1]}, ${result[2]}` : '';
}

export function rgbaToRgbNumber(rgba: string): string {
  const result = rgba.match(/\d+/g);
  if (result) {
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    const a = parseFloat(result[3]);
    const newR = Math.round((1 - a) * 255 + a * r);
    const newG = Math.round((1 - a) * 255 + a * g);
    const newB = Math.round((1 - a) * 255 + a * b);
    return `${newR}, ${newG}, ${newB}`;
  }
  return '';
}

export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
function rgbToHex(color: string): string {
  const result = color.match(/\d+/g);
  if (result) {
    const r = parseInt(result[0]).toString(16).padStart(2, '0');
    const g = parseInt(result[1]).toString(16).padStart(2, '0');
    const b = parseInt(result[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }
  return '';
}
function rgbNumberToHex(color: string): string {
  const rgb = color.split(',').map(num => parseInt(num.trim()));
  
  if (rgb.length !== 3) {
   return '';
  }
  const [r, g, b] = rgb;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

