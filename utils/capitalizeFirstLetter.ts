export function capitalizeFirstLetter(value: string) {
  const toLowerCase = value.toLowerCase();
  return toLowerCase.charAt(0).toUpperCase() + toLowerCase.slice(1);
}
