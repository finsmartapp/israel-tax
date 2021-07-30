export function pensionReliefCalc(taxData, taxYearIndex, pensionContribution, income) {
	//Tax benefit is available as a percent of monthly contributions up to a fixed shekel limit

	const { maxPercent, maxShekel, taxCredit } = taxData[taxYearIndex].pension.taxRelief.salaried;
	const maxBasedOnPercent = income * (maxPercent / 100);
	const ceiling = maxShekel > maxBasedOnPercent ? maxBasedOnPercent : maxShekel;

	let pensionTaxCredit;

	if (pensionContribution >= ceiling) {
		pensionTaxCredit = ceiling * (taxCredit / 100);
	} else {
		pensionTaxCredit = pensionContribution * (taxCredit / 100);
	}

	return pensionTaxCredit;
}
