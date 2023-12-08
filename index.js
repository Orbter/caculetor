const caculetorButtons = document.querySelectorAll(".button");
const specialButtons = document.querySelectorAll(".special-dark");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const zero = document.getElementById("zero");

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
    buttonAnimation(this); // "this" refers to the clicked button
    // Do other actions or calculations related to the button click
  });
  button.addEventListener("mouseleave", function () {
    resetButtonColor(this);
  });
});
