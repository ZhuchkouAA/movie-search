export function isEmpty(obj) {
  if (typeof obj === 'boolean') return false;
  if (obj === ' ') return true;
  for (const key in obj) {
    return false;
  }
  return true;
}
