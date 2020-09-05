export function pensionMinCalc(taxData, taxYearIndex, income, employmentType) {
	//Salaried pay a fixed percent of monthly base salary before any extra earnings
	//Self employed pay different percentages on earnings above and below the national average salary mid-point

	const averageSalary = taxData[taxYearIndex].bituachLeumi.nationalAverageSalary;
	const averageSalaryHalf = averageSalary / 2;
	const { low, high } = taxData[taxYearIndex].pension.legalMinPerecent.selfEmployed;
	const salariedMin = taxData[taxYearIndex].pension.legalMinPerecent.salaried;
	let pensionLegalMin;

	if (employmentType === 'salaried') {
		pensionLegalMin = income * (salariedMin / 100);
	} else if (employmentType === 'selfEmployed') {
		if (income >= averageSalaryHalf) {
			if (income >= averageSalary) {
				pensionLegalMin = averageSalaryHalf * (low / 100) + averageSalaryHalf * (high / 100);
			} else {
				pensionLegalMin =
					averageSalaryHalf * (low / 100) + (income - averageSalaryHalf) * (high / 100);
			}
		} else {
			pensionLegalMin = income * (low / 100);
		}
	}

	return pensionLegalMin;
}
