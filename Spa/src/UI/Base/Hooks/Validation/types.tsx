import { ObjectSchema, Shape } from "yup";

export declare type DomainValidationType<D extends object> = {
  [P in keyof D]: string
}

export declare type DomainInputTouchedType<D extends object> = {
  [P in keyof D]: boolean
}

export declare type UseValidationStatusInputType<D extends object> = {
  schema: ObjectSchema<Shape<object, D>> 
  domain: D
}

export declare type UseValidationStatusOutputType<D extends object> = {
  currentValidationError: DomainValidationType<D> 
  touch: (name: string) => void,
  validate: () => Promise<void>
}
