export declare type CssPropertyAnimationType = {
  [P in keyof CSSStyleDeclaration]?: {
    value: {
      [key: number]: string
    }
  }
} & {
  isNextDisplay: boolean
}

export const searchInputAnimationStatus: CssPropertyAnimationType = {
    isNextDisplay: true, // this boolean gonna be key of 'value'
    width: {
      value: {
        [1]: '300px', // width value when 'true' status
        [0]: '0' // width value when 'false' status
      }
    },
    padding: {
      value: {
        [1]: '5px',
        [0]: '0'
      }
    }
}

