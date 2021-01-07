import { multiply } from './plugins'

export const sum = (a: number, b: number): number => {
  console.log(multiply(a, b))
  return a + b
}

