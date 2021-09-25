export function nationalInsuranceSelfEmp(taxData, taxYearIndex, profit) {
	//Only a percentage of national insurance is tax deductible, but the below (from Bituach Leumi's site) calculates total taxable amount. National and health insurance is then calculated using the standard formula

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

	profit = profit > max ? max : profit;
	const fullRateThresholdPercent = min / averageSalary;
	const reducedRate = reduced / 100;
	const fullRate = full / 100;
	const deductible = selfEmployedNationalInsuranceDiscount / 100;
	let taxable;

	if (profit < min) {
		taxable = profit / (1 + deductible * reducedRate);
	} else {
		taxable =
			(profit + fullRateThresholdPercent * averageSalary * (fullRate - reducedRate) * deductible) /
			(1 + deductible * fullRate);
	}

	return profit - taxable;
}
