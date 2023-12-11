class Calculatore {
  constructor(screen) {
    this.screen = screen;
    this.clear();
  }

  clear() {
    this.screen.textContent = "";
    count = 0;
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

    this.screen.textContent += operator;
    console.log("Operator appended successfully.");
  }

  compute() {
    const expression = this.screen.textContent;

    try {
      // Replace 'x' with '*' and '/' with '/'
      let sanitizedExpression = expression
        .replace(/x/g, "*")
        .replace(/÷/g, "/");

      if (sanitizedExpression.includes("%")) {
        // Calculate percentages
        sanitizedExpression = sanitizedExpression.replace(
          /(\d+%)/g,
          (_, match) => `(${parseFloat(match) * 0.01})*`
        );
      }

      const result = eval(sanitizedExpression);

      // Convert the result to a number before assigning it to the screen
      this.screen.textContent = Number(result);
    } catch (error) {
      // Handle errors, e.g., if the expression is invalid
      this.screen.textContent = "Error";
    }
  }

  barcket() {
    if (count === 0) {
      this.screen.textContent += "(";
      count++;
    } else {
      this.screen.textContent += ") ";
      count--;
    }
  }
  plusOrMinus() {
    // Retrieve the modified expression from findlastnumber
    const modifiedExpression = findlastnumber(this.screen.textContent);

    // Update the screen with the modified expression
    this.screen.textContent = modifiedExpression;
  }
}

// ... (rest of your code)
let count = 0;
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
  // Store the initial background color and size
  const initialColor =
    getComputedStyle(button).getPropertyValue("background-color");
  const width = getComputedStyle(button).getPropertyValue("width");
  const height = getComputedStyle(button).getPropertyValue("height");

  // Set the new size for animation
  button.style.width = "72px";
  button.style.height = "72px";

  // Check if the body has the "dark" class
  const isDarkMode = document.body.classList.contains("dark");

  // Set the background color based on whether it's a special button and the mode
  if (button.classList.contains("special-dark")) {
    button.style.backgroundColor = isDarkMode
      ? "rgba(231, 106, 3, 0.2)"
      : "rgb(72, 219, 63)";
  } else {
    button.style.backgroundColor = isDarkMode
      ? "rgba(192, 188, 188, 0.5)"
      : "rgba(255, 255, 255, 0.2)";
  }

  // Reset the background color and size after a short delay
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

const bracketButton = document.getElementById("bracket");
bracketButton.addEventListener("click", () => {
  calculatore.barcket();
});

plusOrMinus.addEventListener("click", () => {
  calculatore.plusOrMinus();
});

function findlastnumber(expression) {
  // Split the expression by operators
  const tokens = expression
    .split(/([-+*/%])/)
    .filter((token) => token.trim() !== "");

  // Find the last number
  let lastNumber = "";
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token.match(/[0-9.]/)) {
      lastNumber = token + lastNumber;
    } else {
      break; // Stop when an operator is encountered
    }
  }

  // Replace the last occurrence of the last number with its negative value
  const modifiedExpression =
    expression.substring(0, expression.lastIndexOf(lastNumber)) +
    "-" +
    lastNumber;

  return modifiedExpression;
}
