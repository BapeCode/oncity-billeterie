export const formatPhone = (value: string) => {
  const numbers = value.replace(/[^\d]/g, "");
  const limiteNumbers = numbers.slice(0, 10);
  const formatted = limiteNumbers.replace(/(\d{2})(?=\d)/g, "$1 ");

  return formatted;
};
