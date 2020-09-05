export function educationFundCalc(
	taxData,
	taxYearIndex,
	income,
	employmentType,
	contributionPercent
) {
	//Education fund is a tax deductible expense up to a ceiling for self-employed
	//Employers contribution is a tax deductible expense, but a salaried contribution is not. Both have ceilings

	const educationFundContribution = income * (contributionPercent / 100);

	if (employmentType === 'selfEmployed') {
		const { salaryPercent, salaryCeiling } = taxData[taxYearIndex].educationFund[employmentType];
		const monthlyAllowance = (salaryCeiling * (salaryPercent / 100)) / 12;
		var taxDeductible;

		if (educationFundContribution <= monthlyAllowance) {
			taxDeductible = educationFundContribution;
		} else {
			taxDeductible = monthlyAllowance;
		}

		return { educationFundContribution, educationFundTaxDeductible: taxDeductible };
	} else {
		return educationFundContribution;
	}
}
