import espree from 'espree'

export const validateKarnaughReduction = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Ensure simplified predicate logic matches Karnaugh reduction',
		},
		messages: {
			invalidPredicate:
				'{{name}} is incorrect. Update it to match the simplified Karnaugh expression. Reference `README.adoc`',
		},
		schema: [],
	},

	create(context) {
		const expectedMap = {
			predicateOne: '!c',
			predicateTwo: '(a && c) || (!a && c && !d)',
			predicateThree: '!a && b && c && d',
			predicateFour: '!a && !b && c',
		}

		function parseExpression(expr) {
			const program = espree.parse(`(${expr})`, {
				ecmaVersion: 2022,
				sourceType: 'module',
			})
			return program.body[0].expression
		}

		function isAstEqual(a, b) {
			if (a === b) return true
			if (!a || !b || a.type !== b.type) return false

			switch (a.type) {
				case 'Identifier':
					return a.name === b.name

				case 'Literal':
					return a.value === b.value

				case 'UnaryExpression':
					return (
						a.operator === b.operator && a.prefix === b.prefix && isAstEqual(a.argument, b.argument)
					)

				case 'LogicalExpression':
				case 'BinaryExpression':
					return (
						a.operator === b.operator && isAstEqual(a.left, b.left) && isAstEqual(a.right, b.right)
					)

				case 'ConditionalExpression':
					return (
						isAstEqual(a.test, b.test) &&
						isAstEqual(a.consequent, b.consequent) &&
						isAstEqual(a.alternate, b.alternate)
					)

				case 'ParenthesizedExpression':
					// Some parsers produce this node, compare inside it
					return isAstEqual(a.expression, b.expression)

				case 'CallExpression':
					if (!isAstEqual(a.callee, b.callee) || a.arguments.length !== b.arguments.length)
						return false
					for (let i = 0; i < a.arguments.length; i++) {
						if (!isAstEqual(a.arguments[i], b.arguments[i])) return false
					}
					return true

				default:
					// For other node types, fall back to shallow key comparison of important props
					const keys = Object.keys(a).filter(
						(key) =>
							key !== 'loc' &&
							key !== 'range' &&
							key !== 'start' &&
							key !== 'end' &&
							key !== 'parent' &&
							key !== 'extra'
					)
					for (const key of keys) {
						const valA = a[key]
						const valB = b[key]
						if (typeof valA === 'object') {
							if (!isAstEqual(valA, valB)) return false
						} else {
							if (valA !== valB) return false
						}
					}
					return true
			}
		}

		return {
			VariableDeclarator(node) {
				const { id, init } = node

				if (
					id.type === 'Identifier' &&
					expectedMap.hasOwnProperty(id.name) &&
					init?.type === 'ArrowFunctionExpression'
				) {
					const actualBody =
						init.body.type === 'BlockStatement' ? init.body.body[0]?.argument : init.body

					const expectedExprAst = parseExpression(expectedMap[id.name])

					if (!actualBody || !isAstEqual(actualBody, expectedExprAst)) {
						context.report({
							node,
							messageId: 'invalidPredicate',
							data: { name: id.name },
						})
					}
				}
			},
		}
	},
}
