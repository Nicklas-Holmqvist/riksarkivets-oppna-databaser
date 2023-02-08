export function sortDate(data: any) {
  return data
    .sort((a: any, b: any) => a.nummer - b.nummer)
    .sort(
      (a: any, b: any) =>
        Date.parse(a.inskrivningsdatum) - Date.parse(b.inskrivningsdatum)
    );
}
