# Tinie 🪄
Tinie is tiny framework that simply converts JavaScript functions into Restful APIs inspired by [Tanmoy741127/lumi](https://github.com/Tanmoy741127/lumi)

<img src="https://user-images.githubusercontent.com/14465407/205534726-a659c2e1-148e-479d-abf1-021de675e1b5.png" width="500" />

### Feature
- Create __Restful API__ route from javascript functions
- Validate parameter with type or types
- Tinie server wrtten with Fastify

### How to start 🚀
1. Install __tinie__ from npm
```bash
 $ npm install tinie
```

2. Write functions and join function into Tinie
```javascript
import Tinie from "tinie";

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
  // route: 'calc', // you can set custom routing like this
  types: calculatorParamTypes
})

tinie.listen()
```

3. Done, Let's check!
```bash
 $ curl -X POST -H "Content-Type: application/json" -d '{"operation": "add", "a": 4, "b": 2}' http://127.0.0.1:3000/calculator
```

### TODO
- [x] 1-Dimensional parameter parsing
- [ ] Multi-Dimensional parameter parsing
- [ ] Advanced type checker
