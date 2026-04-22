//受け取った関数を<li></li>にして返す関数
function createWorkItem(work) {
  return `<li>${work.title} / ${work.category}</li>`;
}
