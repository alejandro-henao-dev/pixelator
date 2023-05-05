
export interface IColorRGBA{
  r: number,
  g: number,
  b: number,
  a: number
}

export function getColorRGBACssFormat(color:IColorRGBA):string {
  return `rgba(${color.r || 0},${color.g || 0},${color.b || 0}, ${color.a || 0})`
}