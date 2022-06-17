export const convertDate = (date?: string) => {
  if (!date) {
    return "";
  }

  const dateObj = new Date(date);
  const currentTime = new Date();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  if (
    currentTime.getFullYear() === year &&
    currentTime.getMonth() + 1 === month &&
    currentTime.getDate() === day
  ) {
    return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`;
  }

  if (currentTime.getFullYear() === year) {
    return dateObj.toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return dateObj.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
