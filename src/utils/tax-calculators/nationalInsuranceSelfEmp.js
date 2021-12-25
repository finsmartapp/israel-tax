import { formatNumberPlain } from '../formatNumber';

export function nationalInsuranceSelfEmp(taxData, taxYearIndex, profit, eoy) {
	//Only a percentage of national insurance is tax deductible, but the below (from Bituach Leumi's site) calculates total taxable amount. National and health insurance is then calculated using the standard formula

	const months = eoy ? 12 : 1;
	const {
		averageSalary,
		selfEmployedNationalInsuranceDiscount,
		nationalInsurance: {
			band1: {
				rate: { selfEmployed: reduced }
			},
			band2: {
				rate: { selfEmployed: full },
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
	const fullRate = full / 100;
	const deductible = selfEmployedNationalInsuranceDiscount / 100;
	let taxable;

	if (profit < minProrata) {
		taxable = profit / (1 + deductible * reducedRate);
	} else {
		taxable =
			(profit + thresholdMultiplier * averageSalary * (fullRate - reducedRate) * deductible) /
			(1 + deductible * fullRate);
	}

	return profit - taxable;
}
