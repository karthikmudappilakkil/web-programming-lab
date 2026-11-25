var timeDisplay = document.getElementById("time");
var todayDisplay = document.getElementById("today");
var calendar = document.getElementById("calendar");
var monthTitle = document.getElementById("monthTitle");

function updateClock() {
  var now = new Date();
  timeDisplay.textContent = now.toLocaleTimeString();
  todayDisplay.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function showCalendar() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var today = now.getDate();
  var firstWeekday = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  monthTitle.textContent = now.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric"
  });

  // Add empty cells before the first day of the month.
  for (var blank = 0; blank < firstWeekday; blank++) {
    var emptyCell = document.createElement("div");
    calendar.appendChild(emptyCell);
  }

  for (var date = 1; date <= daysInMonth; date++) {
    var dateCell = document.createElement("div");
    dateCell.className = "date-cell";
    dateCell.textContent = date;

    if (date === today) {
      dateCell.className += " today";
    }

    calendar.appendChild(dateCell);
  }
}

updateClock();
setInterval(updateClock, 1000);
showCalendar();
