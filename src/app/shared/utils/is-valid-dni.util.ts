export function isValidDNI(dni: string): boolean {
  // Debe ser exactamente 8 dígitos numéricos
  const regex = /^[0-9]{8}$/;
  return regex.test(dni);
}