const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let tool = "pen";
let penColor = document.getElementById("colorPicker").value;
let penSize = document.getElementById("sizePicker").value;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 40; // leave toolbar space
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Tool selection
function setTool(t) { tool = t; }

// Update color/size
document.getElementById("colorPicker").addEventListener("input", e => penColor = e.target.value);
document.getElementById("sizePicker").addEventListener("input", e => penSize = e.target.value);

// Drawing
let drawing = false;
canvas.addEventListener("mousedown", ()=> drawing = true);
canvas.addEventListener("mouseup", ()=> { drawing=false; ctx.beginPath(); });
canvas.addEventListener("mouseout", ()=> { drawing=false; ctx.beginPath(); });

canvas.addEventListener("mousemove", draw);

function draw(e) {
  if(!drawing) return;

  ctx.lineWidth = (tool==="eraser")?30:penSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = (tool==="eraser")?"#fff":penColor;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// Clear canvas
function clearCanvas() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0,0,canvas.width, canvas.height);
}
clearCanvas();
