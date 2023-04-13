export const classnames = (...classes: Array<String | null | undefined | boolean>) => {
  return classes.filter(c=>c).join(" ")
}