//checking
let level = localStorage.getItem("level");
let grid_size, no_of_mines;
let min_number = 1;
let max_number;
if (level == "easy") {
  grid_size = 8;
  no_of_mines = 10;
  btn_class = "btn-easy";
  max_number = 64;
} else if (level == "medium") {
  grid_size = 12;
  no_of_mines = 23;
  btn_class = "btn-medium";
  max_number = 144;
} else {
  grid_size = 16;
  no_of_mines = 40;
  btn_class = "btn-hard";
  max_number = 256;
}
//structuring html elements
let whole_div = document.createElement("div");
whole_div.setAttribute("class", "whole");
let start_div = document.createElement("div");
start_div.setAttribute("class", "start");
let start_button = document.createElement("button");
start_button.setAttribute("class", "start_button");
start_button.innerText = "Start";
start_div.append(start_button);
let instructions_div = document.createElement("div");
instructions_div.setAttribute("class", "instructions");
let score_div = document.createElement("div");
score_div.setAttribute("class", "score");
score_div.innerText = "Score: 0";
let level_div = document.createElement("div");
level_div.setAttribute("class", "level");
level_div.innerText = `Level: ${level}`;
let time_div = document.createElement("div");
time_div.setAttribute("class", "time");
time_div.innerText = "Time: 5:00";
instructions_div.append(score_div, level_div, time_div);
let grid_div = document.createElement("div");
grid_div.setAttribute("class", "grid");
let buttons = [];
let start = 1;
//creating buttons
for (let i = 0; i < grid_size; i++) {
  buttons[i] = [];
  for (let j = 0; j < grid_size; j++) {
    let temp = createButton(btn_class, start);
    buttons[i].push(temp);
    start++;
  }
}
whole_div.append(start_div, instructions_div, grid_div);
document.body.append(whole_div);

//creating button and disabling buttons before pressing start declaration
function createButton(a, b) {
  let button = document.createElement("button");
  button.setAttribute("class", a);
  button.setAttribute("id", String(b));
  button.setAttribute("disabled", true);
  grid_div.append(button);
  return button;
}
document.querySelector(".start_button").addEventListener("click", start_game);

//score declaration
let score;

//starting game
function start_game() {
  //disabling the start button
  document.querySelector(".start_button").disabled = true;

  //score initialization
  score = 0;

  // random mines generation
  let random_positions = minesGeneration();

  //populating mines and values
  let button_values = populateData(random_positions);
  let button_status = getButtonStatus(button_values);
  //adding event listeners for all the functions
  for (let i = 0; i < buttons.length; i++) {
    for (let j = 0; j < buttons[i].length; j++) {
      callEventListeners(buttons[i][j].id, i, j);
    }
  }

  function callEventListeners(id, i, j) {
    document.getElementById(id).addEventListener("click", () => {
      let bomb = `<i class="fas fa-bomb"></i>`;
      if (button_status[i][j] == true && button_values[i][j] != bomb) {
        return;
      }
      button_status[i][j] = true;
      document.getElementById(id).innerHTML = button_values[i][j];
      document.getElementById(id).style.background = "#2b2d42";
      if (button_values[i][j] == 0) {
        document.getElementById(id).style.color = "#007f5f";
      } else if (button_values[i][j] == 1) {
        document.getElementById(id).style.color = "#bfd200";
      } else if (button_values[i][j] == 2) {
        document.getElementById(id).style.color = "#ffff3f";
      } else if (button_values[i][j] == 3) {
        document.getElementById(id).style.color = "#ff9900";
      } else if (button_values[i][j] == 4) {
        document.getElementById(id).style.color = "#ff6600";
      } else if (button_values[i][j] == 5) {
        document.getElementById(id).style.color = "#ff5400";
      } else if (button_values[i][j] == 6) {
        document.getElementById(id).style.color = "#ff4800";
      } else if (button_values[i][j] == 7) {
        document.getElementById(id).style.color = "#e01e37";
      } else if (button_values[i][j] == 8) {
        document.getElementById(id).style.color = "#a71e34";
      }
      if (button_values[i][j] != bomb) {
        score++;
      } else {
        clearInterval(setID);
        endGame();
      }
      document.querySelector(".score").innerText = `Score: ${score}`;
      let complete_game_checker = 0;
      for (let i = 0; i < button_status.length; i++) {
        for (let j = 0; j < button_status[i].length; j++) {
          if (button_status[i][j] == false) {
            complete_game_checker++;
            break;
          }
        }
        if (complete_game_checker != 0) {
          break;
        }
      }
      console.log(complete_game_checker);
      if (complete_game_checker == 0) {
        console.log("test");
        clearInterval(setID);
        winGame();
      }
    });
  }

  // timer
  //setting intial values for timer
  let minutes = [5];
  let seconds = [0];
  let timer = `Time: ${minutes[0]}:00`;
  document.querySelector(".time").innerText = timer;
  let setID = setInterval(() => {
    change_time(minutes, seconds);
  }, 1000);
  //timer function declaration
  function change_time(minutes, seconds) {
    if (minutes[0] == 0 && seconds[0] == 0) {
      document.querySelector(".time").innerText = `Time: 0:00`;
      clearInterval(setID);
      endGame();
    }
    if (seconds[0] == 0 && minutes[0] != 0) {
      minutes[0]--;
      seconds[0] = 59;
    }
    if (String(seconds[0]).length != 1) {
      timer = `Time: ${minutes[0]}:${seconds[0]}`;
    } else {
      timer = `Time: ${minutes[0]}:0${seconds[0]}`;
    }
    document.querySelector(".time").innerText = timer;
    seconds[0]--;
  }
  //to enable the grid buttons
  enableButtons();
}

//winning game declaration
function winGame() {
  disablingButtons();
  if (level == "easy") {
    localStorage.setItem("easyHighestScore", score);
  } else if (level == "medium") {
    localStorage.setItem("mediumHighestScore", score);
  } else {
    localStorage.setItem("hardHighestScore", score);
  }
  // creating modal
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  let modal_header = document.createElement("div");
  modal_header.setAttribute("class", "modal_header");
  let heading = document.createElement("h1");
  heading.innerText = "YOU WON!";
  heading.style.color = "green";
  let modal_score = document.createElement("h2");
  modal_score.setAttribute("class", "modal_score");
  modal_score.innerText = `Your Score: ${score}`;
  let modal_high_score = document.createElement("h2");
  modal_high_score.setAttribute("class", "modal_high_score");
  modal_high_score.innerText = `High Score: ${score}`;
  let play_button = document.createElement("button");
  play_button.setAttribute("type", "button");
  play_button.setAttribute("class", "play_button");
  let main_anchor = document.createElement("a");
  main_anchor.setAttribute("href", "./difficulty_page.html");
  main_anchor.innerText = "Play";
  play_button.append(main_anchor);

  modal_header.append(heading);
  modal.append(modal_header, modal_score, modal_high_score, play_button);
  whole_div.append(modal);
}

//ending game declaration
function endGame() {
  //disabling buttons after game is over
  disablingButtons();
  //comparing current data
  let maxy;
  if (level == "easy") {
    maxy = localStorage.getItem("easyHighestScore");
  } else if (level == "medium") {
    maxy = localStorage.getItem("mediumHighestScore");
  } else {
    maxy = localStorage.getItem("hardHighestScore");
  }

  maxy = Math.max(maxy, score);
  if (level == "easy") {
    localStorage.setItem("easyHighestScore", maxy);
  } else if (level == "medium") {
    localStorage.setItem("mediumHighestScore", maxy);
  } else {
    localStorage.setItem("hardHighestScore", maxy);
  }
  // creating modal
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  let modal_header = document.createElement("div");
  modal_header.setAttribute("class", "modal_header");
  let heading = document.createElement("h1");
  heading.style.color = "red";
  heading.innerText = "GAME OVER!";
  let modal_score = document.createElement("h2");
  modal_score.setAttribute("class", "modal_score");
  modal_score.innerText = `Your Score: ${score}`;
  let modal_high_score = document.createElement("h2");
  modal_high_score.setAttribute("class", "modal_high_score");
  modal_high_score.innerText = `High Score: ${maxy}`;
  let play_button = document.createElement("button");
  play_button.setAttribute("type", "button");
  play_button.setAttribute("class", "play_button");
  let main_anchor = document.createElement("a");
  main_anchor.setAttribute("href", "./difficulty_page.html");
  main_anchor.innerText = "Play";
  play_button.append(main_anchor);

  modal_header.append(heading);
  modal.append(modal_header, modal_score, modal_high_score, play_button);
  whole_div.append(modal);
}

//enabling buttons function declaration
function enableButtons() {
  for (let i = 0; i < buttons.length; i++) {
    for (let j = 0; j < buttons[i].length; j++) {
      buttons[i][j].disabled = false;
    }
  }
}

//random mines generation function declaration
function minesGeneration() {
  let random_positions = [];
  while (random_positions.length != no_of_mines) {
    let a = Math.floor(Math.random() * (max_number - min_number)) + min_number;
    if (random_positions.indexOf(a) == -1) {
      random_positions.push(a);
    }
  }
  return random_positions;
}

//populating data function declaration
function populateData(random_positions) {
  //populating button values
  button_values = [];
  for (let i = 0; i < buttons.length; i++) {
    button_values[i] = [];
    for (let j = 0; j < buttons[i].length; j++) {
      let temp = parseInt(buttons[i][j].id);
      if (random_positions.indexOf(temp) != -1) {
        button_values[i][j] = `<i class="fas fa-bomb"></i>`;
      } else {
        button_values[i][j] = 0;
      }
    }
  }
  let bomb = `<i class="fas fa-bomb"></i>`;
  for (let i = 0; i < button_values.length; i++) {
    for (let j = 0; j < button_values[i].length; j++) {
      if (button_values[i][j] == bomb) {
        continue;
      } else {
        let count = 0;
        if (i - 1 >= 0) {
          if (j - 1 >= 0) {
            if (button_values[i - 1][j - 1] == bomb) {
              count++;
            }
          }
          if (j + 1 < grid_size) {
            if (button_values[i - 1][j + 1] == bomb) {
              count++;
            }
          }
          if (button_values[i - 1][j] == bomb) {
            count++;
          }
        }
        if (j - 1 >= 0) {
          if (button_values[i][j - 1] == bomb) {
            count++;
          }
          if (i + 1 < grid_size) {
            if (button_values[i + 1][j - 1] == bomb) {
              count++;
            }
          }
        }
        if (i + 1 < grid_size) {
          if (button_values[i + 1][j] == bomb) {
            count++;
          }
          if (j + 1 < grid_size) {
            if (button_values[i + 1][j + 1] == bomb) {
              count++;
            }
          }
        }
        if (j + 1 < grid_size) {
          if (button_values[i][j + 1] == bomb) {
            count++;
          }
        }
        button_values[i][j] = count;
      }
    }
  }
  return button_values;
}

//for disabling buttons after game is over function declaration
function disablingButtons() {
  for (let i = 0; i < buttons.length; i++) {
    for (let j = 0; j < buttons[i].length; j++) {
      buttons[i][j].disabled = true;
    }
  }
}

//getting button status function declaration
function getButtonStatus(button_values) {
  let a = [];
  for (let i = 0; i < button_values.length; i++) {
    a[i] = [];
    for (let j = 0; j < button_values[i].length; j++) {
      if (button_values[i][j] == `<i class="fas fa-bomb"></i>`) {
        a[i][j] = true;
      } else {
        a[i][j] = false;
      }
    }
  }
  return a;
}
