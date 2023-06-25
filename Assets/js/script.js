
$(function () {

  let hours = document.getElementById("hours");
  let currentDay = document.getElementById("currentDay");

  const timeStart = 9;
  const timeEnd = 17;

  let currentDate;
  let currentHour;
  let currentHour24;

  let taskArray = [];


  // set the task array
  let setTaskArray = (theId, theValue) => {
    if (taskArray.length === 0) {
      taskArray.push({ id: theId, value: theValue });
      return;
    } else {
      for (let task of taskArray) {
        if (task.id === theId) {

          task.value = theValue;
          taskFound = true;
          return;
        }
      }
    }
    taskArray.push({ id: theId, value: theValue });
  }


  // on save button click
  hours.addEventListener("click", (event) => {
    let textarea, id;
    if (event.target.matches("button")) {
      textarea = event.target.parentNode.querySelector("textarea");
      id = event.target.parentNode.id;
      setTaskArray(id, textarea.value);
      localStorage.setItem("taskArray", JSON.stringify(taskArray));
    } else if (event.target.matches("i")) {
      textarea = event.target.parentNode.parentNode.querySelector("textarea");
      id = event.target.parentNode.parentNode.id;
      setTaskArray(id, textarea.value);
      localStorage.setItem("taskArray", JSON.stringify(taskArray));
    }
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
      timeState = "future";
    } else {
      timeState = "past";
    }
    id = `hour-${time}`;

    let value = "";
    for (let task of taskArray) {
      // console.log(task.id);

      if (task.id === id) {
        value = task.value;
      }
    }

    const additionalInnerText =
      `<div id="${id}" class="row time-block ${timeState}">` +
      '<div class="col-2 col-md-1 hour text-center py-3">' +
      twentyFourToTwelve(time) +
      '</div>' +
      '<textarea class="col-8 col-md-10 description" rows = "3" >' +
      value +
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

    // get the localstorage of the task list
    let array = JSON.parse(localStorage.getItem("taskArray"));
    if (array) {
      taskArray = array;
    }

    // create the list
    for (let i = timeStart; i < timeEnd + 1; i++) {
      creatOneTimeDiv(i);
    }

    //set the time counter
    setInterval(refreshTime, 1000);
  }

  onload();

});


