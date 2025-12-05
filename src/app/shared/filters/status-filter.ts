export function filterByStatus<T>(items: T[], field: keyof T, status: string): T[] 
{
    if (!status) return items; return items.filter(item => item[field] === status); 
}