// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  let hours = document.getElementById("hours");
  let currentDay = document.getElementById("currentDay");

  const timeStart = 1;
  const timeEnd = 24;

  let currentDate;
  let currentHour;
  let currentHour24;
  let currentMinute;

  hours.addEventListener("click", (event) => {
    console.log(event.target.nodeName);
    // $('#1a').text(today.format('MMM D, YYYY'));

    // if (event.target.matches("textarea")) {
    //   console.log("textarea");
    // }
  })


  //  refresh current time
  let refreshTime = () => {
    currentDate = dayjs().format('MMMM D, YYYY');
    currentHour = dayjs().format('h A');
    currentHour24 = dayjs().format('H');
    currentHourMinute = dayjs().format('h:mm:ss A');
    currentDay.innerHTML = `${currentDate}, ${currentHourMinute}`;
  }


  // create one time div
  let creatOneTimeDiv = (time) => {

    currentHourInt = parseInt(currentHour24);

    if (currentHourInt === time) {
      timeState = "present";
    } else if (currentHourInt < time) {
      timeState = "past";
    } else {
      timeState = "future";
    }

    const additionalInnerText =
      `<div id="hour-${time}" class="row time-block ${timeState}">` +
      '<div class="col-2 col-md-1 hour text-center py-3">' +
      twentyFourToTwelve(time) +
      '</div>' +
      '<textarea class="col-8 col-md-10 description" rows = "3" >' +
      '</textarea >' +
      '<button class="btn saveBtn col-2 col-md-1" aria-label="save">' +
      '<i class="fas fa-save" aria-hidden="true"></i>' +
      '</button></div >';

    hours.innerHTML += additionalInnerText;
  }


  // input: number
  // output: string
  let twentyFourToTwelve = (time) => {
    if (time === 12) {
      return "12 PM";
    } else if (time === 0) {
      return "12 AM";
    } else if (time < 12) {
      return time + "AM";
    } else {
      return (time - 12) + "PM";
    }
  }

  let onload = () => {
    refreshTime();
    for (let i = timeStart; i < timeEnd + 1; i++) {
      creatOneTimeDiv(i);
    }

    //set the time counter
    setInterval(refreshTime, 1000);

  }

  onload();


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


