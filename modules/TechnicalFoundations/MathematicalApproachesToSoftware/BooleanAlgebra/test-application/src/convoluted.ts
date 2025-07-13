/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint local-rules/non-condensed-predicates: 0 */

// Predicates: *DO NOT REQUIRE UPDATING*
const predicateA: boolean = true
const predicateB: boolean = false
const predicateC: boolean = false
const predicateD: boolean = true

// Constants: *DO NOT REQUIRE UPDATING*
const functionOne = (): void => {}
const functionTwo = (): void => {}
const functionThree = (): void => {}
const functionFour = (): void => {}

// Reference const *DOES NOT REQUIRE UPDATING*
export const convoluted = (): void => {
	if (predicateA) {
		if (!predicateC) {
			functionOne()
		} else {
			if (predicateD) {
				functionTwo()
			}
		}
	} else {
		if (predicateB) {
			if (predicateC && predicateD) {
				functionThree()
			}
			if (!predicateC) {
				functionOne()
			}
		} else {
			if (predicateC || predicateD) {
				functionFour()
			}
		}
	}

	if (predicateB) {
		if (predicateC && !predicateD) {
			functionTwo()
		}
	} else {
		if (!predicateA && predicateC && predicateD) {
			functionThree()
		}
	}
}

// *Simplified const *DOES NOT REQUIRE UPDATING*
export const simple = (): void => {
	if (predicateOne(predicateA, predicateB, predicateC, predicateD)) {
		functionOne()
	}

	if (predicateTwo(predicateA, predicateB, predicateC, predicateD)) {
		functionTwo()
	}

	if (predicateThree(predicateA, predicateB, predicateC, predicateD)) {
		functionThree()
	}

	if (predicateFour(predicateA, predicateB, predicateC, predicateD)) {
		functionFour()
	}
}

// These predicates are what require updating.
// The type signatures do not require changing, just the contents.
// Each predicate should match the simplified expression from the Karnaugh map.
const predicateOne = (a: boolean, b: boolean, c: boolean, d: boolean): boolean => {
	return false
}

const predicateTwo = (a: boolean, b: boolean, c: boolean, d: boolean): boolean => {
	return false
}

const predicateThree = (a: boolean, b: boolean, c: boolean, d: boolean): boolean => {
	return false
}

const predicateFour = (a: boolean, b: boolean, c: boolean, d: boolean): boolean => {
	return false
}

// Expectations:
// predicateOne = !C
// predicateTwo = A && C || !A && C && !D
// predicateThree = !A && B && C && D
// predicateFour = !A && !B && C
