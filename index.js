class Calculatore {
  constructor(screen) {
    this.screen = screen;
    this.clear();
  }

  clear() {
    this.screen.textContent = "";
  }

  deleat() {
    const trimmedContent = this.screen.textContent.trim();
    const allnumbers = trimmedContent.length;
    this.screen.textContent = trimmedContent.slice(0, allnumbers - 1);
  }

  appendNumber(number) {
    this.screen.textContent += number;
  }

  choseOperetor(operator) {
    if (this.screen.textContent === "") return;

    const lastnumber = this.screen.textContent.trim().slice(-1);
    console.log(`Last character: ${lastnumber}`);

    // Check if the operator is a bracket
    if (operator === "(" || operator === ")") {
      // Handle bracket separately
      this.screen.textContent += operator;
      console.log("Bracket appended successfully.");
      return;
    }

    if (
      lastnumber === "+" ||
      lastnumber === "-" ||
      lastnumber === "x" ||
      lastnumber === "÷" ||
      lastnumber === "%"
    ) {
      // If an operator is already present, don't append a new one
      console.log("Operator already present, not appending.");
      return;
    }

    this.screen.textContent += ` ${operator} `;
    console.log("Operator appended successfully.");
  }

  compute() {
    const expression = this.screen.textContent;
    let percentageMatches = [];
    // Use the eval function to evaluate the expression
    try {
      // Replace 'x' with '*' and '/' with '/'
      let sanitizedExpression = expression
        .replace(/x/g, "*")
        .replace(/÷/g, "/");

      if (sanitizedExpression.includes("%")) {
        percentageMatches = sanitizedExpression.match(/\d+\s*%\s*\d+/g);

        if (percentageMatches) {
          percentageMatches.forEach((match) => {
            const [num, remainder] = match
              .split(/\s*%\s*/)
              .map((item) => parseInt(item, 10));
            const computedValue = (num / 100) * remainder;
            sanitizedExpression = sanitizedExpression.replace(
              match,
              computedValue
            );
          });
        }
      }
      const result = eval(sanitizedExpression);
      this.screen.textContent = result;
    } catch (error) {
      // Handle errors, e.g., if the expression is invalid
      this.screen.textContent = "Error";
    }
  }
  barcket() {
    if (count === 0) {
      this.screen.textContent += " (";
      count++;
    } else {
      this.screen.textContent += ") ";
      count--;
    }
  }
  plusOrMinus() {}
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
const barcket = document.querySelector("[data-bracket]");
const plusOrMinus = document.querySelector("[data-minusOrplus]");
const calculatore = new Calculatore(screen);
function buttonAnimation(button) {
  // Store the initial background color
  const initialColor = button.style.backgroundColor;
  const height = button.style.height; // Fix typo: heaight to height
  const width = button.style.width;
  button.style.width = "72px";
  button.style.height = "72px"; // Fix typo: heaight to height
  // Check if the button is a special button based on its class
  if (button.classList.contains("special-dark")) {
    button.style.backgroundColor = "rgb(72, 219, 63)";
  } else {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  }

  // Reset the background color to the initial color after a short delay
  setTimeout(() => {
    button.style.backgroundColor = initialColor;
    button.style.width = width;
    button.style.height = height;
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
  });
});

deleatAll.addEventListener("click", () => {
  calculatore.clear();
});
deleat.addEventListener("click", () => {
  calculatore.deleat();
});

operitoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculatore.choseOperetor(button.innerText);
  });
});
equalButton.addEventListener("click", () => {
  calculatore.compute();
});
// Your existing code...
let count = 0;
const bracketButton = document.getElementById("bracket");
bracketButton.addEventListener("click", () => {
  calculatore.barcket();
});

plusOrMinus.addEventListener("click", () => {
  calculatore.plusOrMinus();
});
// Other event listeners...
