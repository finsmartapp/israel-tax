export function nationalInsuranceSelfEmp(taxData, taxYearIndex, profit) {
	//Only a percent of national insurance is tax deductible, but the below (from Bituach Leumi's site) calculates total to deduct and tax the remaining normally for national and health insurance

	const {
		nationalAverageSalary,
		selfEmployedNationalInsuranceDiscountPercent,
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
	const fullRateThresholdPercent = min / nationalAverageSalary;
	const reducedRate = reduced / 100;
	const fullRate = full / 100;
	const deductible = selfEmployedNationalInsuranceDiscountPercent / 100;
	let taxable;

	if (profit < min) {
		taxable = profit / (1 + deductible * reducedRate);
	} else {
		taxable =
			(profit +
				fullRateThresholdPercent * nationalAverageSalary * (fullRate - reducedRate) * deductible) /
			(1 + deductible * fullRate);
	}

	return profit - taxable;
}
