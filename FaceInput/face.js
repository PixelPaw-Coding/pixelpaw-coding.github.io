const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let model, neutral = null;
const sensitivity = 15; // pixels

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  return new Promise(resolve => video.onloadedmetadata = () => resolve());
}

function simulateKey(key) {
  const e = new KeyboardEvent("keydown", { key });
  document.dispatchEvent(e);
  console.log("Simulated:", key);
}

function getNosePosition(landmarks) {
  const nose = landmarks[1]; // index 1 is nose tip
  return { x: nose.x, y: nose.y };
}

function getDirection(nose) {
  if (!neutral) return null;

  const dx = nose.x - neutral.x;
  const dy = nose.y - neutral.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > sensitivity) return "ArrowRight";
    else if (dx < -sensitivity) return "ArrowLeft";
  } else {
    if (dy > sensitivity) return "ArrowDown";
    else if (dy < -sensitivity) return "ArrowUp";
  }
  return null;
}

async function runDetection() {
  const faces = await model.estimateFaces({ input: video });

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (faces.length > 0) {
    const pos = getNosePosition(faces[0].scaledMesh);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
    ctx.fill();

    if (!neutral) {
      neutral = pos;
      console.log("Neutral position set.");
    } else {
      const dir = getDirection(pos);
      if (dir) simulateKey(dir);
    }
  }

  requestAnimationFrame(runDetection);
}

async function main() {
  await setupCamera();
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  );
  runDetection();
}

main();
