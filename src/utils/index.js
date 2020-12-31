

// 计算
export const Compute = {
	isNumber: function(...args) {
		args.forEach(function(arg) {
			if (isNaN(arg)) {
				throw new Error('计算参数不是数值')
			}
		})
	},
	// 加
	add: function(a, b, fixed = 2) {
		this.isNumber(a, b)
		return Number(Number(a + b).toFixed(fixed))
	},
	// 减
	reduce: function(a, b, fixed = 2) {
		this.isNumber(a, b)
		return Number(Number(a - b).toFixed(fixed))
	},
	// 乘
	multiply: function(a, b, fixed = 2) {
		this.isNumber(a, b)
		return Number(Number(a * b).toFixed(fixed))
	},
	// 除
	divide: function(a, b, fixed = 2) {
		this.isNumber(a, b)
		return Number(Number(a / b).toFixed(fixed))
	},
}