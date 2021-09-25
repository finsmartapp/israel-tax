export function pensionReliefCalc(taxData, taxYearIndex, income, pensionContribution) {
	//Tax benefit available to a fixed percentage of the salary with a ceiling based on the national avaerage salary. Part of that can be deducted as an expense and the remaining part a tax credit, up to a ceiling

	const { taxDeductable, taxCredit, taxCreditRate, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	const taxDeductableAbsoluteMax = (ceiling / 12) * (taxDeductable / 100);
	const taxCreditAbsoluteMax = (ceiling / 12) * (taxCredit / 100);
	const taxDeductableRelativeMax = income * (taxDeductable / 100);
	const taxCreditRelativeMax = income * (taxCredit / 100);
	let pensionTaxDeductible;
	let pensionTaxCredit = 0;

	const taxCreditEligible = () => {
		const remainingContribution = pensionContribution - taxDeductableRelativeMax;

		if (remainingContribution > taxCreditRelativeMax) {
			if (taxCreditRelativeMax > taxCreditAbsoluteMax) {
				pensionTaxCredit = taxCreditAbsoluteMax * (taxCreditRate / 100);
			} else {
				pensionTaxCredit = taxCreditRelativeMax * (taxCreditRate / 100);
			}
		} else if (remainingContribution > taxCreditAbsoluteMax) {
			pensionTaxCredit = taxCreditAbsoluteMax * (taxCreditRate / 100);
		} else {
			pensionTaxCredit = remainingContribution * (taxCreditRate / 100);
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

	return { pensionTaxDeductible, pensionTaxCredit };
}
