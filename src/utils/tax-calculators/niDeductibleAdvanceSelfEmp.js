import bituachLeumiTables from '../../data/bituach-leumi.json';
export function niDeductibleAdvanceSelfEmpCalc(taxYearIndex, advance, eoy) {
	//A percentage of national insurance is income tax deductible. Only available on premiums paid during the year
	// (typically advances) and differeent to the deduction on final innsurance payments.

	const months = eoy ? 12 : 1;
	const {
		selfEmployedNationalInsuranceDiscount,
		nationalInsurance: {
			band1: {
				rate: { selfEmployed: niReduced },
				max
			},
			band2: {
				rate: { selfEmployed: niRegular }
			}
		},
		healthInsurance: {
			band1: {
				rate: { selfEmployed: hiReduced }
			},
			band2: {
				rate: { selfEmployed: hiRegular }
			}
		}
	} = bituachLeumiTables[taxYearIndex];

	const niReducedRate = niReduced / 100;
	const hiReducedRate = hiReduced / 100;
	const niReducedMax = max * niReducedRate * months;
	const hiReducedMax = max * hiReducedRate * months;
	const niReducedFraction = niReduced / (niReduced + hiReduced);
	const niRegularFraction = niRegular / (niRegular + hiRegular);
	const reducedMax = niReducedMax + hiReducedMax;
	let niComponent;

	if (advance <= reducedMax) {
		niComponent = niReducedFraction * advance;
	} else {
		niComponent = niRegularFraction * (advance - reducedMax) + niReducedMax;
	}

	return niComponent * (selfEmployedNationalInsuranceDiscount / 100);
}
