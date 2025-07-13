import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import localRules from './eslint-rules/index.js'

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['src/**/*.ts'],
		plugins: {
			'local-rules': localRules,
		},
		rules: {
			'local-rules/non-condensed-predicates': 'error',
			'local-rules/validate-karnaugh-reduction': 'error',
		},
	},
]
