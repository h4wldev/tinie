import Tinie from "./tinie";

const calculator = (
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

tinie.register(calculator, {
  types: calculatorParamTypes
})

tinie.listen()
