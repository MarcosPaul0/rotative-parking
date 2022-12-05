export function formatCpf(cpf: string): string {
  const formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
    6,
    9
  )}-${cpf.slice(9, 11)}`;

  return formattedCpf;
}
