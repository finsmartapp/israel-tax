export function pensionReliefCalc(taxData, taxYearIndex, pensionContribution) {
	//Tax benefit is available as a percent of monthly contributions up to a fixed shekel limit

	const { maxShekel, taxCredit } = taxData[taxYearIndex].pension.taxRelief.salaried;
	let pensionTaxCredit;

	if (pensionContribution >= maxShekel) {
		pensionTaxCredit = maxShekel * (taxCredit / 100);
	} else {
		pensionTaxCredit = pensionContribution * (taxCredit / 100);
	}

	return pensionTaxCredit;
}
