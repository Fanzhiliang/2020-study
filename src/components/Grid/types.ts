export interface ColProps {
  span: number,
  push: number,
  pull: number,
  xs: number | ColProps,
}

export const typeOptions: string[] = ['', 'flex']

export const justifyOptions: string[] = ['start', 'end', 'center', 'space-around', 'space-between']

export const alignOptions: string[] = ['start', 'end', 'center']
