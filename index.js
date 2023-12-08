class Calculatore {
  constructor(screen) {
    this.screen = screen;
    this.clear();
  }

  clear() {
    this.screen.textContent = "";
  }

  appendNumber(number) {
    this.screen.textContent += number;
  }

  choseOperetor(operator) {
    this.screen.textContent += ` ${operator} `;
  }

  compute() {}
  updatedisplay() {}
}

// ... (rest of your code)

const caculetorButtons = document.querySelectorAll(".button");
const specialButtons = document.querySelectorAll(".special-dark");
const numberButtons = document.querySelectorAll("[data-number]");
const operitoreButtons = document.querySelectorAll("[data-operetore]");
const equalButton = document.querySelector("[data-equls]");
const deleatAll = document.querySelector("[data-deletAll]");
const deleat = document.querySelector("[data-delet]");
const screen = document.querySelector("[deta-screen]");
const calculatore = new Calculatore(screen);
function buttonAnimation(button) {
  // Store the initial background color
  const initialColor = button.style.backgroundColor;

  // Check if the button is a special button based on its class
  if (button.classList.contains("special-dark")) {
    button.style.backgroundColor = "rgb(72, 219, 63)";
  } else {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  }

  // Reset the background color to the initial color after a short delay
  setTimeout(() => {
    button.style.backgroundColor = initialColor;
  }, 200); // Adjust the delay as needed
}

function resetButtonColor(button) {
  button.style.backgroundColor = "";
}

// Attach the event listener to each button
caculetorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    buttonAnimation(this);
  });
  button.addEventListener("mouseleave", function () {
    resetButtonColor(this);
  });
});
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculatore.appendNumber(button.innerText);
    calculatore.updatedisplay();
  });
});

operitoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculatore.choseOperetor(button.innerText);
    calculatore.updatedisplay();
  });
});
