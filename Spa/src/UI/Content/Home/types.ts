export declare type CssPropertyAnimationType = {
  [P in keyof CSSStyleDeclaration]?: {
    value: {
      [key: number]: string
    }
  }
} & {
  isNextDisplay: boolean
}
