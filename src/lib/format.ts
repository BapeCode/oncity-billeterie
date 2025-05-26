export const formatPhone = (value: string) => {
  let cleanValue = value.replace(/\s/g, "");

  cleanValue = cleanValue.replace(/^(\+33|0033)/, "0");

  const numbers = cleanValue.replace(/[^\d]/g, "");

  const limiteNumbers = numbers.slice(0, 10);

  const formatted = limiteNumbers.replace(/(\d{2})(?=\d)/g, "$1 ");

  return formatted;
};

export const formatTime = (value: string) => {
  const date = new Date(value);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}/${month}/${year} - ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};
