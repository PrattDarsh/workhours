// function initStorage() {
//   if (
//     localStorage.getItem("totalHours") == null &&
//     localStorage.getItem("totalMinutes") == null
//   ) {
//     localStorage.setItem("totalHours", 0);
//     localStorage.setItem("totalMinutes", 0);
//   }
//   totalHours = parseInt(localStorage.getItem("totalHours"));
//   totalMinutes = parseInt(localStorage.getItem("totalMinutes"));

//   totalHours += hours;
//   totalMinutes += minutes;

//   totalHours += Math.floor(totalMinutes / 60);
//   totalMinutes %= 60;

//   localStorage.setItem("totalHours", totalHours);
//   localStorage.setItem("totalMinutes", totalMinutes);
// }

// module.exports = initStorage;
