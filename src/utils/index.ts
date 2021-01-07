
// 计算
export const Compute = {
  // 加
  add: function(a: number, b: number, fixed = 2): number {
    return Number(Number(a + b).toFixed(fixed))
  },
  // 减
  reduce: function(a: number, b: number, fixed = 2): number {
    return Number(Number(a - b).toFixed(fixed))
  },
  // 乘
  multiply: function(a: number, b: number, fixed = 2): number {
    return Number(Number(a * b).toFixed(fixed))
  },
  // 除
  divide: function(a: number, b: number, fixed = 2): number {
    return Number(Number(a / b).toFixed(fixed))
  },
}
