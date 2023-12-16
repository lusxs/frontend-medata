export function parseAndFormatDateString(dateString) {
  const parsedDate = new Date(dateString);
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = parsedDate.getDate().toString().padStart(2, "0");

  return `${day}-${month}-${year}`;
}

export function generateWeeklyData() {
  // Mendapatkan tanggal saat ini
  let currentDate = new Date();

  // Membuat array untuk menyimpan data harian selama 7 hari
  let weeklyData = [];

  // Loop untuk 7 hari terakhir
  for (let i = 0; i < 7; i++) {
    // Mengurangkan i hari dari tanggal saat ini
    let currentDay = new Date();
    currentDay.setDate(currentDate.getDate() - i);

    // Menambahkan data harian ke dalam array dalam format yang diinginkan
    if (currentDay.getDay() !== 0 && currentDay.getDay() !== 6) {
      weeklyData.push(
        currentDay.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
        })
      );
    }
  }

  // Mengembalikan array data harian
  return weeklyData;
}
export function getCurrentMonth() {
  // Create an array of month names
  let monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Create a new Date object
  let currentDate = new Date();

  // Get the current month index
  let currentMonthIndex = currentDate.getMonth();

  // Get the name of the current month
  let currentMonthName = monthNames[currentMonthIndex];

  return currentMonthName;
}

export function getLastSixMonths() {
  let monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let lastSixMonths = [];

  for (let i = 0; i < 6; i++) {
    let monthIndex = (currentMonth - i + 12) % 12; // Handling month wrap-around
    let lastMonthName = monthNames[monthIndex];
    lastSixMonths.push(lastMonthName);
  }

  return lastSixMonths;
}
export function generateSevenWeekdays() {
  // Get the current date
  let currentDate = new Date();

  // Create an array to store 7 days of data
  let weekdayData = [];

  // Loop until the array has 7 elements
  while (weekdayData.length < 7) {
    // Subtract 1 day from the current date
    let currentDay = new Date();
    currentDay.setDate(currentDate.getDate() - weekdayData.length);

    // Add data to the array if the current day is not Saturday (6) or Sunday (0)
    if (currentDay.getDay() !== 0 && currentDay.getDay() !== 6) {
      weekdayData.push(
        currentDay.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
        })
      );
    }
  }

  // Return the array of 7 days of data
  return weekdayData;
}
