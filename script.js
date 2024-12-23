const hamburger = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("hide");
});

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

const params = {
  radius: 250, // Base radius of the circle
  morphStrength: 0.02, // How much the shape morphs
  rotationSpeed: 0.0005, // Speed of rotation
  colors: [
    "rgba(128, 0, 128, 1)",
    "rgba(75, 0, 130, 1)",
    "rgba(139, 0, 139, 1)",
    "rgba(147, 112, 219, 1)",
    "rgba(186, 85, 211, 1)",
  ],
};

let mouse = { x: center.x, y: center.y };
let rotation = 0;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

// Main animation function
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dx = mouse.x - center.x;
  const dy = mouse.y - center.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const morphFactor = Math.min(distance / canvas.width, params.morphStrength);

  rotation += params.rotationSpeed;

  ctx.save();
  ctx.translate(center.x, center.y);
  ctx.rotate(rotation);

  ctx.beginPath();

  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 60) {
    const waveOffset =
      Math.sin(angle * 8 + rotation) * morphFactor * params.radius * 0.3;
    const offset =
      Math.sin(angle * 6 + distance * 0.02) * morphFactor * params.radius +
      waveOffset;
    const x = (params.radius + offset) * Math.cos(angle);
    const y = (params.radius + offset) * Math.sin(angle);
    angle === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.restore();

  // Fill with gradient when morphing
  const gradient = ctx.createLinearGradient(
    center.x - params.radius,
    center.y - params.radius,
    center.x + params.radius,
    center.y + params.radius
  );
  params.colors.forEach((color, i) => {
    gradient.addColorStop(i / (params.colors.length - 1), color);
  });
  ctx.fillStyle = gradient;

  ctx.fill();

  requestAnimationFrame(update);
}

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  center.x = canvas.width / 2;
  center.y = canvas.height / 2;
}

window.addEventListener("resize", setupCanvas);

setupCanvas();
update();

