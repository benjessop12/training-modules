export const nonCondensedPredicates = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Non condensed predicates',
		},
		schema: [],
		messages: {
			requiredPattern:
				'No hint, you need to update `inMemoryModelStore.ts.` Cross check README.adoc',
		},
	},

	create(context) {
		return {
			IfStatement(node) {
				const test = node.test

				if (
					test.type === 'LogicalExpression' &&
					test.operator === '||' &&
					test.left.type === 'LogicalExpression' &&
					test.left.operator === '&&' &&
					test.right.type === 'LogicalExpression' &&
					test.right.operator === '&&'
				) {
					const [left1, left2] = [test.left.left, test.left.right]
					const [right1, right2] = [test.right.left, test.right.right]

					const isCallTo = (node, name) =>
						node.type === 'CallExpression' &&
						node.callee.type === 'Identifier' &&
						node.callee.name === name

					const match =
						isCallTo(left1, 'predicateTwo') &&
						isCallTo(left2, 'predicateOne') &&
						isCallTo(right1, 'predicateTwo') &&
						isCallTo(right2, 'predicateThree')

					if (match) return
				}

				context.report({
					node: test,
					messageId: 'requiredPattern',
				})
			},
		}
	},
}
