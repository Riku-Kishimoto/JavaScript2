import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

import { vote, getRates } from "./candidates.js";

const animateBars = () => {
  const rates = getRates();

  rates.forEach(({ id, rate }) => {
    const bar = document.querySelector(`[data-id="${id}"] .bar`);

    animate(
      bar,
      {
        width: `${rate}%`,
      },
      {
        duration: 0.5,
        easing: "ease-out",
      },
    );
  });
};

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const id = Number(card.dataset.id);

  const btn = card.querySelector(".vote-btn");

  btn.addEventListener("click", () => {
    vote(id);

    animate(
      btn,
      {
        scale: [1, 1.2, 1],
      },
      {
        duration: 0.3,
      },
    );

    animateBars();
  });
});
