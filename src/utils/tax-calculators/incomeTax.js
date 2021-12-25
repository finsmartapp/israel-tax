export function incomeTaxCalc(
	taxData,
	taxYearIndex,
	taxableIncome,
	annualBonus,
	creditPointsTaxCredit,
	pensionTaxCredit,
	employment,
	eoy
) {
	//Income tax uses annual tax bands
	//Bonus calculated separatly to ensure tax that month isn't multipled by 12 for yearly total

	let incomes = eoy
		? [taxableIncome]
		: employment === 'selfEmployed'
		? [taxableIncome * 12]
		: [(taxableIncome - annualBonus) * 12, (taxableIncome - annualBonus) * 12 + annualBonus];
	const credits = creditPointsTaxCredit + pensionTaxCredit;
	let taxes = [];

	incomes.forEach(income => {
		let taxDue = 0;
		const taxBands = Object.keys(taxData[taxYearIndex].incomeTax);

		taxBands.forEach(taxBand => {
			let { rate, min, max } = taxData[taxYearIndex].incomeTax[taxBand];
			let bandAdjustment;
			//Adjust as min band is inclusive and is lost during x - min
			min === 0 ? (bandAdjustment = 0) : (bandAdjustment = 1);

			if (income >= min) {
				if (max === undefined) {
					taxDue += (income - min + bandAdjustment) * (rate / 100);
				} else if (income >= max) {
					taxDue += (max - min + bandAdjustment) * (rate / 100);
				} else {
					taxDue += (income - min + bandAdjustment) * (rate / 100);
				}
			}
		});

		taxes.push(taxDue);
	});

	const annualTax = taxes[0];
	const taxOnBonus = employment === 'employee' ? taxes[1] - taxes[0] : 0;
	const incomeTax = eoy ? annualTax - credits : annualTax / 12 + taxOnBonus - credits;
	const annualIncomeTax = annualTax + taxOnBonus - credits * 12;

	return {
		incomeTax: incomeTax > 0 ? incomeTax : 0,
		annualIncomeTax: annualIncomeTax > 0 ? annualIncomeTax : 0
	};
}
