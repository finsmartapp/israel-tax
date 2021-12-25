export function pensionMinCalc(taxData, taxYearIndex, income, employmentType, eoy) {
	//Employees pay a fixed percent of monthly base salary before any extra earnings
	//Self employed pay different percentages on earnings above and below the national average salary mid-point

	const averageSalaryMonth = taxData[taxYearIndex].bituachLeumi.averageSalary;
	const averageSalary = eoy ? averageSalaryMonth * 12 : averageSalaryMonth;
	const averageSalaryHalf = averageSalary / 2;
	const { reducedRate, fullRate } = taxData[taxYearIndex].pension.legalMin.selfEmployed;
	const employeeMin = taxData[taxYearIndex].pension.legalMin.employee;
	let pensionLegalMin;

	if (employmentType === 'employee') {
		pensionLegalMin = income * (employeeMin / 100);
	} else {
		if (income >= averageSalaryHalf) {
			if (income >= averageSalary) {
				pensionLegalMin =
					averageSalaryHalf * (reducedRate / 100) + averageSalaryHalf * (fullRate / 100);
			} else {
				pensionLegalMin =
					averageSalaryHalf * (reducedRate / 100) + (income - averageSalaryHalf) * (fullRate / 100);
			}
		} else {
			pensionLegalMin = income * (reducedRate / 100);
		}
	}

	return pensionLegalMin;
}
