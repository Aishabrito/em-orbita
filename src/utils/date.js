
export const getToday = () => {
  return new Date().toISOString().split('T')[0];
};

export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.floor(
    (d2 - d1) / (1000 * 60 * 60 * 24)
  );
};
