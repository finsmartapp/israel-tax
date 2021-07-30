export function studyFundCalc(taxData, taxYearIndex, income, employment, amount, type) {
	//Education fund is a tax deductible expense up to a ceiling for self-employed
	//Employers contribution is a tax deductible expense, but a salaried contribution is not. Both have ceilings to be eligible for capital gains relief

	const contribution = type === 'shekel' ? amount : income * (amount / 100);
	const { salaryPercent, salaryCeiling } = taxData[taxYearIndex].studyFund[employment];
	const monthlyAllowance = (salaryCeiling * (salaryPercent / 100)) / 12;
	let taxDeductible;

	if (contribution <= monthlyAllowance) {
		taxDeductible = contribution;
	} else {
		taxDeductible = monthlyAllowance;
	}

	if (employment === 'selfEmployed') {
		return { studyFundContribution: contribution, studyFundTaxDeductible: taxDeductible };
	} else {
		return contribution;
	}
}
