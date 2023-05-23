const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");

const timeLeftTag = document.querySelector(".time span b");
const mistakesTag = document.querySelector(".mistake span");

const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");

const retryButton = document.querySelector(".content button");

let totalTime = 60, timeLeft = totalTime;
let charIndex = mistakes = isTyping = 0;

let timer;

const calculateWpm = () => {

  return ((charIndex - mistakes) / 5) / (totalTime - timeLeft) * 60;
};

function loadParagraph() {

  const ranIndex = Math.floor(Math.random() * paragraphs.length);

  typingText.innerHTML = "";

  paragraphs[ranIndex].split("").forEach(char => {

    typingText.innerHTML += `<span>${char}</span>`;
  });

  typingText.querySelectorAll("span")[0].classList.add("active");

  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}

function startTyping() {

  let characters = typingText.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];

  if (charIndex < (characters.length - 1) && timeLeft > 0) {

    if (!isTyping) {

      timer = setInterval(startTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {

      if (charIndex > 0) {

        charIndex -= 1;

        if (characters[charIndex].classList.contains("incorrect")) {

          mistakes -= 1;
        }

        characters[charIndex].classList.remove("correct", "incorrect");
      }

    } else {

      if (characters[charIndex].innerText == typedChar) {

        characters[charIndex].classList.add("correct");

      } else {

        mistakes += 1;

        characters[charIndex].classList.add("incorrect");
      }

      charIndex += 1;
    }

    characters.forEach(span => span.classList.remove("active"));

    characters[charIndex].classList.add("active");

    let wpm = Math.round(calculateWpm());

    wpm = (wpm < 0) || !wpm || ((wpm === Infinity) ? 0 : wpm);

    wpmTag.innerText = wpm;
    mistakesTag.innerText = mistakes;

    cpmTag.innerText = charIndex - mistakes;

  } else {

    clearInterval(timer);
    inputField.value = "";
  }
}

function startTimer() {

  if (timeLeft > 0) {

    timeLeftTag.innerText = (timeLeft -= 1);

    wpmTag.innerText = Math.round(calculateWpm());

  } else clearInterval(timer);
}

function resetGame() {

  loadParagraph();
  clearInterval(timer);

  timeLeft = totalTime;
  charIndex = mistakes = isTyping = 0;

  inputField.value = "";

  timeLeftTag.innerText = timeLeft;
  mistakesTag.innerText = 0;

  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

loadParagraph();

inputField.addEventListener("input", startTyping);
retryButton.addEventListener("click", resetGame);