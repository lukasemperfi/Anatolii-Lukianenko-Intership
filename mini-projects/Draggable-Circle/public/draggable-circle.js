const socket = io();
const dragItem = document.getElementById("item");
const container = document.getElementById("container");

let active = false;

let coords = {
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
};

container.addEventListener("mousedown", dragStart);
container.addEventListener("mousemove", drag);
container.addEventListener("mouseup", dragEnd);

socket.on("connect", () => {
  socket.once("init_data", (data) => {
    coords = data;
    setTranslate(data.lastX, data.lastY, dragItem);
  });
});

socket.on("send_coords", (data) => {
  coords = data;
  setTranslate(data.lastX, data.lastY, dragItem);
});

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function dragStart(e) {
  if (e.target !== dragItem) {
    return;
  }

  active = true;
  coords.startX = e.clientX - coords.lastX;
  coords.startY = e.clientY - coords.lastY;
}

function drag(e) {
  if (!active) {
    return;
  }
  e.preventDefault();
  coords.lastX = e.clientX - coords.startX;
  coords.lastY = e.clientY - coords.startY;
  socket.emit("coords_change", coords);

  setTranslate(coords.lastX, coords.lastY, dragItem);
}

function dragEnd(e) {
  if (e.target !== dragItem) {
    return;
  }

  coords.startX = coords.lastX;
  coords.startY = coords.lastY;
  active = false;
}
