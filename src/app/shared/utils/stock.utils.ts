export function calcularEstado(
  actual: number,
  minimo: number
): 'Disponible' | 'Alerta' | 'Crítico' {
  if (actual < minimo) return 'Crítico';
  if (actual === minimo) return 'Alerta';
  return 'Disponible';
}