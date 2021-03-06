let main_page_whole = document.createElement("div");
main_page_whole.setAttribute("class", "whole");
let main_page_header = document.createElement("header");
main_page_header.setAttribute("class", "main_page_header");
main_page_header.innerHTML = "BATTLESHIP MINESWEEPER";
let main_page_container = document.createElement("div");
main_page_container.setAttribute("class", "main_page_container");
let play_button = document.createElement("button");
play_button.setAttribute("type", "button");
play_button.setAttribute("class", "play_button");
play_button.innerText = "Play!";
main_page_container.append(play_button);
main_page_whole.append(main_page_header, main_page_container);
document.body.append(main_page_whole);
play_button.addEventListener("click", () => {
  window.location.href = "./difficulty_page.html";
});
//setting highest score
localStorage.setItem("easyHighestScore", 0);
localStorage.setItem("mediumHighestScore", 0);
localStorage.setItem("hardHighestScore", 0);
