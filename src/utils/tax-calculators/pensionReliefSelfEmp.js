export function pensionReliefCalc(taxData, taxYearIndex, income, pensionContribution) {
	//Tax benefit available to a fixed percentage of the salary with a ceiling based on the national avaerage salary. Part of that can be deducted as an expense and the remaining part a tax credit, up to a ceiling

	const { taxDeductableLimit, taxCreditLimit, taxCreditRate, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	const taxDeductableAbsoluteMax = (ceiling / 12) * (taxDeductableLimit / 100);
	const taxCreditAbsoluteMax = (ceiling / 12) * (taxCreditLimit / 100);
	const taxDeductableRelativeMax = income * (taxDeductableLimit / 100);
	const taxCreditRelativeMax = income * (taxCreditLimit / 100);
	let pensionTaxDeductible;
	let pensionTaxCredit = 0;

	const taxCreditEligible = () => {
		const taxCreditContribution = pensionContribution - taxDeductableRelativeMax;

		if (taxCreditContribution > taxCreditRelativeMax) {
			if (taxCreditRelativeMax > taxCreditAbsoluteMax) {
				pensionTaxCredit = taxCreditAbsoluteMax;
			} else {
				pensionTaxCredit = taxCreditRelativeMax;
			}
		} else if (taxCreditContribution > taxCreditAbsoluteMax) {
			pensionTaxCredit = taxCreditAbsoluteMax;
		} else {
			pensionTaxCredit = taxCreditContribution;
		}
	};

	if (pensionContribution > taxDeductableRelativeMax) {
		taxCreditEligible();
		if (taxDeductableRelativeMax > taxDeductableAbsoluteMax) {
			pensionTaxDeductible = taxDeductableAbsoluteMax;
		} else {
			pensionTaxDeductible = taxDeductableRelativeMax;
		}
	} else if (pensionContribution > taxDeductableAbsoluteMax) {
		pensionTaxDeductible = taxDeductableAbsoluteMax;
	} else {
		pensionTaxDeductible = pensionContribution;
	}
	return { pensionTaxDeductible, pensionTaxCredit: pensionTaxCredit * (taxCreditRate / 100) };
}
