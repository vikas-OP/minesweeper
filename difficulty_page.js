let whole_div = document.createElement("div");
whole_div.setAttribute("class", "whole");
let head_div = document.createElement("header");
head_div.setAttribute("class", "difficult-head");
let h1 = document.createElement("h1");
h1.innerText = "CHOOSE DIFFICULTY LEVEL";
head_div.append(h1);
let sect_div = document.createElement("section");
sect_div.setAttribute("class", "main-sec");
let button1 = createButton("btns", "easy", "Easy");
let button2 = createButton("btns", "medium", "Medium");
let button3 = createButton("btns", "hard", "Hard");
sect_div.append(button1, button2, button3);
function createButton(class1, class2, text) {
  let b = document.createElement("button");
  b.setAttribute("type", "button");
  b.classList.add(class1, class2);
  b.innerText = text;
  return b;
}
whole_div.append(head_div, sect_div);
document.body.append(whole_div);
document.querySelector(".easy").addEventListener("click", () => {
  localStorage.setItem("level", "easy");
  window.location.href = "./game_page.html";
});
document.querySelector(".medium").addEventListener("click", () => {
  localStorage.setItem("level", "medium");
  window.location.href = "./game_page.html";
});
document.querySelector(".hard").addEventListener("click", () => {
  localStorage.setItem("level", "hard");
  window.location.href = "./game_page.html";
});
