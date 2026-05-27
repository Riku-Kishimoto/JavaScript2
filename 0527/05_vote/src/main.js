import { animate, inView, stagger } from "motion";
//vote関数 getRates関数を読み込んでいる
import { vote, getRates } from "./candidates.js";

animate(
  ".hero h1",
  { opacity: [0, 1], y: [-20, 0] },
  { duration: 0.8, easing: "ease-out" },
);
animate(
  ".hero p",
  { opacity: [0, 1], y: [10, 0] },
  { duration: 0.8, delay: 0.25, easing: "ease-out" },
);

const animateBars = () => {
  const rates = getRates();
  rates.forEach(({ id, rate }) => {
    const bar = document.querySelector(`[data-id="${id}"] .bar`);
    animate(bar, { width: `${rate}%` }, { duration: 0.6, easing: "spring" });
  });
};

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  const id = Number(card.dataset.id);
  const btn = card.querySelector(".vote-btn");

  btn.addEventListener("click", () => {
    vote(id);
    animate(btn, { scale: [1, 1.3, 0.9, 1] }, { duration: 0.4 });
    animateBars();
  });
});

inView(".card", (element) => {
  const index = [...cards].indexOf(element);

  animate(
    element,
    { opacity: [0, 1], y: [40, 0], scale: [0.95, 1] },
    {
      duration: 0.7,
      delay: index * 0.12,
      easing: "ease-out",
    },
  );

  animate(
    element.querySelector(".candidate-image"),
    { opacity: [0, 1], scale: [0.8, 1] },
    { duration: 0.5, delay: index * 0.12 + 0.2, easing: "ease-out" },
  );

  animate(
    element.querySelector(".candidate-name"),
    { opacity: [0, 1], y: [10, 0] },
    { duration: 0.4, delay: index * 0.12 + 0.35, easing: "ease-out" },
  );

  animate(
    element.querySelector(".votes"),
    { opacity: [0, 1], y: [10, 0] },
    { duration: 0.4, delay: index * 0.12 + 0.45, easing: "ease-out" },
  );

  animate(
    element.querySelector(".vote-btn"),
    { opacity: [0, 1], y: [10, 0] },
    { duration: 0.4, delay: index * 0.12 + 0.55, easing: "ease-out" },
  );

  return () => {
    [
      element,
      element.querySelector(".candidate-image"),
      element.querySelector(".candidate-name"),
      element.querySelector(".votes"),
      element.querySelector(".vote-btn"),
    ].forEach((el) => {
      animate(el, { opacity: 0, y: 10 }, { duration: 0 });
    });
  };
});

scroll(
  animate("body", {
    backgroundColor: ["#fff9f0", "#fff0f5", "#f0f9ff", "#f0fff4"],
  }),
  {
    offset: ["0%", "33%", "66%", "100%"], // スクロール量に対応
  },
);
