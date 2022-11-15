const secondsHand = document.getElementById("sec");
const minutesHand = document.getElementById("min");
const hoursHand = document.getElementById("hour");
const clock = document.getElementById("clock");

const getTime = () => {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const timeInterval = 6;

  clock.style.visibility = "visible";
  secondsHand.style.transform = `rotateZ(${seconds * timeInterval}deg)`;
  minutesHand.style.transform = `rotateZ(${
    minutes * timeInterval + seconds / 10
  }deg)`;
  hoursHand.style.transform = `rotateZ(${hours * 30 + minutes / 2}deg)`;
};

setInterval(getTime, 100);
