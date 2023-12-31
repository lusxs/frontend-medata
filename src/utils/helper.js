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
export function generateSevenWeekdays() {
  let currentDate = new Date();

  let weekdayData = [];

  while (weekdayData.length < 7) {
    let currentDay = new Date();
    currentDay.setDate(currentDate.getDate() - weekdayData.length);

    if (currentDay.getDay() !== 0 && currentDay.getDay() !== 6) {
      weekdayData.push(
        currentDay.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
        })
      );
    }
  }

  return weekdayData;
}

export function sumArray(arr) {
  if (!Array.isArray(arr) || arr.some(isNaN)) {
    throw new Error("Input must be an array of numbers");
  }
  const sum = arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return sum;
}
