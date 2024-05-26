export function formatDate(dateString) {
  const date = new Date(dateString);

  // Mapeando o nome dos meses
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

  // Obtendo dia, mês e ano da data
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Retornando a data formatada
  return `${Number(day) + 1} ${month} ${year}`;
}
