/*
  ToolTip is on Top
*/
export const top = (w, h) => {
  const wt = w * 0.1;
  const ht = h * 0.1;
  const b = h - ht;
  return `M0 0 L${w} 0 L${w} ${b} L${(w / 2) + wt} ${b} L${w / 2} ${h} L${(w / 2) - wt} ${b} L0 ${b} Z`;
};

/*
  ToolTip is on Bottom
*/
export const bottom = (w, h) => {
  const wt = w * 0.1;
  const ht = h * 0.1;
  const b = h - ht;
  return `M0 ${ht} L${(w / 2) - wt} ${ht} L${(w / 2)} ${0} L${(w / 2) + wt} ${ht} L${w} ${ht} L${w} ${h} L0 ${h} Z`;
};
