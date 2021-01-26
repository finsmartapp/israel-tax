export function educationFundCalc(
	taxData,
	taxYearIndex,
	income,
	employmentType,
	contributionPercent
) {
	//Education fund is a tax deductible expense up to a ceiling for self-employed
	//Employers contribution is a tax deductible expense, but a salaried contribution is not. Both have ceilings to be eligible for capital gains relief

	const contribution = income * (contributionPercent / 100);
	const { salaryPercent, salaryCeiling } = taxData[taxYearIndex].educationFund[employmentType];
	const monthlyAllowance = (salaryCeiling * (salaryPercent / 100)) / 12;
	let educationFundContribution;

	if (contribution <= monthlyAllowance) {
		educationFundContribution = contribution;
	} else {
		educationFundContribution = monthlyAllowance;
	}

	if (employmentType === 'selfEmployed') {
		return { educationFundContribution, educationFundTaxDeductible: educationFundContribution };
	} else {
		return educationFundContribution;
	}
}
