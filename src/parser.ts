import stringifyParamters from 'stringify-parameters'

type Param = {
  name: string
  required: boolean
}

export class FunctionParser {
  constructor (private readonly _function: Function) {}

  get name(): string {
    return this._function.name
  }

  get isAsync(): boolean {
    return this._function.toString().startsWith('async')
  }

  get params(): Param[] {
    const paramsString = stringifyParamters(this._function)
    .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
    .trim()

    return paramsString.split(',').map(p => p.trim()).map((param) => {
      const [name, defaultValue] = param.split('=')
      return {
        name: name.trim(),
        required: !defaultValue,
      }
    })
  }
}
