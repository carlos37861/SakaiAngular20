export function filterByText<T>(items: T[], fields: (keyof T)[], text: string): T[] {
  if (!text) return items;

  const query = text.toLowerCase();

  return items.filter(item =>
    fields.some(field =>
      item[field]?.toString().toLowerCase().includes(query)
    )
  );
}