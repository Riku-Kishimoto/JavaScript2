const candidates = [
  {
    id: 1,
    votes: 0,
  },
  {
    id: 2,
    votes: 0,
  },
  {
    id: 3,
    votes: 0,
  },
];

// 票数表示更新
const updateVoteText = () => {
  candidates.forEach((item) => {
    const card = document.querySelector(`[data-id="${item.id}"]`);

    const votesText = card.querySelector(".votes");

    votesText.textContent = `${item.votes}票`;
  });
};

// 得票率を返す
export const getRates = () => {
  const total = candidates.reduce((sum, item) => {
    return sum + item.votes;
  }, 0);

  return candidates.map((item) => {
    return {
      id: item.id,
      rate: total > 0 ? Math.round((item.votes / total) * 100) : 0,
    };
  });
};

// 投票処理
export const vote = (id) => {
  const target = candidates.find((item) => {
    return item.id === id;
  });

  if (!target) return;

  target.votes++;

  updateVoteText();
};

export const getWinnerId = () => {
  const sorted = [...candidates].sort((a, b) => {
    return b.votes - a.votes;
  });

  return sorted[0].id;
};
