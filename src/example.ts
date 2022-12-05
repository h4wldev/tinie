import Tinie from "./tinie";

// uppercase replace with dash(-), ex) /helloWorld -> /hello-world
// underscore(_) replace with slash(/), ex) /hello_world -> /hello/world
// So, CalculatorExample_test -> /calculator-example/test
const CalculatorExample_test = (
  operation: "add" | "subtract" | "multiply" | "divide" = "divide", // if you set default value on parameter, it's optional
  a: number,
  b: number
) => {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
  }
}

const calculatorParamTypes = {
  operation: ["string"], // if you set array on value, it's meant "or"
  a: "number",
  b: "number"
}

const tinie = new Tinie()

tinie.register(
  CalculatorExample_test,
  {
    types: calculatorParamTypes
  }
)

tinie.listen()
