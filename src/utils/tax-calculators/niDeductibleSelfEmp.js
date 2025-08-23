import { formatNumberPlain } from '../formatNumber';

export function niDeductibleSelfEmpCalc(taxData, taxYearIndex, profit, eoy) {
	//A percentage of national insurance is bituach luemi tax deductible, calculated on the final payments.
	// Although only applicable to NI and not health, calculate the total taxable amount, which can then be fed into
	// the bituach leumi formula. This can be adapted to calculate that too if needed.

	const months = eoy ? 12 : 1;
	const {
		averageSalary,
		selfEmployedNationalInsuranceDiscount,
		nationalInsurance: {
			band1: {
				rate: { selfEmployed: reduced }
			},
			band2: {
				rate: { selfEmployed: regular },
				min,
				max
			}
		}
	} = taxData[taxYearIndex].bituachLeumi;
	const minProrata = min * months;
	const maxProrata = max * months;
	profit = profit > maxProrata ? maxProrata : profit;
	const thresholdMultiplier = formatNumberPlain((min / averageSalary) * months, 1);
	const reducedRate = reduced / 100;
	const regularRate = regular / 100;
	const deductibleRate = selfEmployedNationalInsuranceDiscount / 100;
	let taxable;

	if (profit < minProrata) {
		taxable = profit / (1 + deductibleRate * reducedRate);
	} else {
		taxable =
			(profit +
				thresholdMultiplier * averageSalary * (regularRate - reducedRate) * deductibleRate) /
			(1 + deductibleRate * regularRate);
	}

	return profit - taxable;
}
