"use strict";

// 填入真实信息后，底部按钮自动启用。简历文件建议放在网站根目录。
const PROFILE = {
  github: "https://github.com/wujinchao111", // 例如：https://github.com/your-username
  email: "2561987072@qq.com", // 例如：your-name@example.com
  resume: "./resume.pdf" // 例如：./resume.pdf
};

const contactLinks = {
  github: document.querySelector("#github-link"),
  email: document.querySelector("#email-link"),
  resume: document.querySelector("#resume-link")
};

Object.entries(contactLinks).forEach(([key, link]) => {
  const value = PROFILE[key].trim();
  if (!value) {
    link.addEventListener("click", event => event.preventDefault());
    return;
  }
  link.href = key === "email" ? `mailto:${value}` : value;
  link.removeAttribute("aria-disabled");
  link.removeAttribute("title");
  link.querySelector(".contact-state").textContent = key === "resume" ? "↓" : "↗";
});
if (Object.values(PROFILE).every(value => value.trim())) {
  document.querySelector("#contact-note").hidden = true;
}
document.querySelector("#year").textContent = new Date().getFullYear();

const fallback = "./images/placeholder.svg";
// 真正的截图尚未放入 images 时，显示明确标注的占位图，避免破图。
document.querySelectorAll(".shot img").forEach(img => {
  const showFallback = () => {
    if (img.dataset.fallback) return;
    img.dataset.fallback = "true";
    img.src = fallback;
    img.alt = `${img.alt}（截图待补充）`;
  };
  img.addEventListener("error", showFallback);
  if (img.complete && img.naturalWidth === 0) showFallback();
});

const dialog = document.querySelector("#lightbox");
const fullImage = document.querySelector("#lightbox-image");
const title = document.querySelector("#lightbox-title");
const caption = document.querySelector("#lightbox-caption");
const status = document.querySelector("#lightbox-status");
const counter = document.querySelector("#lightbox-count");
const closeButton = document.querySelector("#lightbox-close");
let gallery = [];
let currentIndex = 0;
let opener = null;
let touchStart = null;

function renderImage() {
  const shot = gallery[currentIndex];
  const preview = shot.querySelector("img");
  title.textContent = shot.closest(".project-card").querySelector("h3").textContent;
  caption.textContent = shot.dataset.caption;
  counter.textContent = `${currentIndex + 1} / ${gallery.length}`;
  status.textContent = "正在加载图片…";
  fullImage.alt = preview.alt;
  fullImage.src = shot.dataset.full;
}

fullImage.addEventListener("load", () => {
  status.textContent = fullImage.getAttribute("src") === fallback
    ? "截图待补充 · 当前为占位图"
    : "使用左右方向键切换图片，Esc 关闭";
});
fullImage.addEventListener("error", () => {
  if (fullImage.getAttribute("src") !== fallback) {
    fullImage.alt = "截图待补充";
    fullImage.src = fallback;
  } else {
    status.textContent = "图片暂时无法加载";
  }
});

document.querySelectorAll(".shot").forEach(shot => {
  shot.addEventListener("click", () => {
    opener = shot;
    gallery = Array.from(shot.closest(".gallery").querySelectorAll(".shot"));
    currentIndex = gallery.indexOf(shot);
    renderImage();
    dialog.showModal();
    document.body.classList.add("no-scroll");
    closeButton.focus();
  });
});

function changeImage(direction) {
  if (!gallery.length) return;
  currentIndex = (currentIndex + direction + gallery.length) % gallery.length;
  renderImage();
}
closeButton.addEventListener("click", () => dialog.close());
document.querySelector("#lightbox-prev").addEventListener("click", () => changeImage(-1));
document.querySelector("#lightbox-next").addEventListener("click", () => changeImage(1));
dialog.addEventListener("close", () => {
  document.body.classList.remove("no-scroll");
  opener?.focus({ preventScroll: true });
});
// 只有从遮罩上按下并松开才关闭，避免拖动图片时误触。
let backdropPressed = false;
function outsideDialog(event) {
  const box = dialog.getBoundingClientRect();
  return event.clientX < box.left || event.clientX > box.right ||
    event.clientY < box.top || event.clientY > box.bottom;
}
dialog.addEventListener("pointerdown", event => { backdropPressed = outsideDialog(event); });
dialog.addEventListener("click", event => {
  if (backdropPressed && outsideDialog(event)) dialog.close();
  backdropPressed = false;
});
dialog.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    changeImage(event.key === "ArrowLeft" ? -1 : 1);
  }
  // 原生 dialog 提供模态焦点约束及 Esc 关闭。
});
fullImage.addEventListener("touchstart", event => {
  touchStart = event.touches.length === 1
    ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
}, { passive: true });
fullImage.addEventListener("touchend", event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) changeImage(dx < 0 ? 1 : -1);
  touchStart = null;
}, { passive: true });
fullImage.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });
