import { nonCondensedPredicates } from './non-condensed-predicates'
import { validateKarnaughReduction } from './validate-karnaugh-reduction'

export default {
	rules: {
		'non-condensed-predicates': nonCondensedPredicates,
		'validate-karnaugh-reduction': validateKarnaughReduction,
	},
}
