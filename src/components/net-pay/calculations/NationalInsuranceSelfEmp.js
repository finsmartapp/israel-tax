export function nationalInsuranceSelfEmp(taxData, taxYearIndex, profit) {
	//Only a percent of national insurance is tax deductible, but the below (from Bituach Leumi's site) calculates total to deduct and tax the remaining normally for national and health insurance

	const {
		nationalAverageSalary,
		selfEmployedTaxDeductiblePercent,
		nationalInsurance: {
			band1: {
				rate: { selfEmployed: reduced }
			},
			band2: {
				rate: { selfEmployed: standard },
				min
			}
		}
	} = taxData[taxYearIndex].bituachLeumi;

	const standardRateStart = min / nationalAverageSalary;
	const reducedRate = reduced / 100;
	const standardRate = standard / 100;
	const deductible = selfEmployedTaxDeductiblePercent / 100;
	const taxable =
		(profit +
			standardRateStart * nationalAverageSalary * ((standardRate - reducedRate) * deductible)) /
		(1 + deductible * standardRate);

	return profit - taxable;
}
