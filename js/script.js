const keys = document.querySelectorAll(".calculator__btn");
const displayInput = document.querySelector(".calculator__display-input");
const displayOutput = document.querySelector(".calculator__display-output");

let input = "";

keys.forEach((key) => {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      displayInput.innerHTML = "";
      displayOutput.innerHTML = "";
    } else if (value == "back") {
      input = input.slice(0, -1);
      displayInput.innerHTML = makeCleanInput(input);
    } else if (value == "=") {
      try {
        let result = "= " + eval(getPercent(input));
        result = result.slice(0, 13);
        displayOutput.innerHTML = makeCleanOutput(result);
      } catch (e) {
        if ((e.name = "SyntaxError")) {
          displayOutput.innerHTML = "Wrong Input!";
          input = "";
          displayInput.innerHTML = "";
        }
      }
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      displayInput.innerHTML = makeCleanInput(input);
    } else {
      if (validateInput(value)) {
        input += value;
        displayInput.innerHTML = makeCleanInput(input);
      }
    }
  });
});

function makeCleanInput(input) {
  let inputArray = input.split("");

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == "*") {
      inputArray[i] = `<span>&times</span>`;
    } else if (inputArray[i] == "/") {
      inputArray[i] = `<span>&divide</span>`;
    } else if (inputArray[i] == "+") {
      inputArray[i] = `<span>+</span>`;
    } else if (inputArray[i] == "-") {
      inputArray[i] = `<span>-</span>`;
    } else if (inputArray[i] == "(") {
      inputArray[i] = `<span>(</span>`;
    } else if (inputArray[i] == ")") {
      inputArray[i] = `<span>)</span>`;
    } else if (inputArray[i] == "%") {
      inputArray[i] = `<span>%</span>`;
    }
  }

  return inputArray.join("");
}

function makeCleanOutput(output) {
  let outputString = output.toString();
  let decimal = outputString.split(".")[1];
  outputString = outputString.split(".")[0];

  let outputArray = outputString.split("");

  if (outputArray.length > 3) {
    for (let i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, " ");
    }
  }

  if (decimal) {
    outputArray.push(".");
    outputArray.push(decimal);
  }

  return outputArray.join("");
}

function validateInput(value) {
  let lastInput = input.slice(-1);
  let operators = ["+", "-", "*", "/", "%"];

  if (input.length > 13) {
    input = input.slice(0, 13);
  }

  if (value == "." && lastInput == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(lastInput)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function getPercent(input) {
  let inputArray = input.split("");

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] == "%") {
      inputArray[i] = "/100";
    }
  }

  return inputArray.join("");
}
