export const epochToFormattedDate = (epoch: number): string => {
  const date = new Date(epoch * 1000);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
};

export const formatISODateLong = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
