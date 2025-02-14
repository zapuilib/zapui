export type Padding =
  | `${paddingString} ${paddingString} ${paddingString} ${paddingString}`
  | `${paddingString} ${paddingString} ${paddingString}`
  | `${paddingString} ${paddingString}`
  | paddingString;
  
export type paddingString =
    | `${string}px`
    | `${string}rem`
    | `${string}em`
    | `${string}%`
    | `${string}vw`
    | `${string}vh`
    | `${string}vmin`
    | `${string}vmax`
    | `${string}ch`
    | `${string}ex`
    | `${string}cm`
    | `${string}mm`
    | `${string}in`
    | `${string}pt`
    | `${string}pc`;