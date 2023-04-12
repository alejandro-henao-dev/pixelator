export const classnames = (...classes: Array<String | null | undefined | boolean>) => {
  return classes.map(c=>c).join(" ")
}