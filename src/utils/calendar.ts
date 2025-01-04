export const generateCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendar = [];

  for (let i = 0; i < firstDay; i++) {
    calendar.push(null); // For empty spaces at the beginning of the month
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendar.push(day);
  }

  return calendar;
};
