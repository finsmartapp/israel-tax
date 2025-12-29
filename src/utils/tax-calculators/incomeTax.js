import incomeTaxTables from '../../data/income-tax.json';
export function incomeTaxCalc(taxYearIndex, taxableIncome, annualBonus, credits, employment, eoy) {
	//Income tax uses annual tax bands
	//Bonus calculated separatly to ensure tax that month isn't multipled by 12 for yearly total

	const taxBands = Object.keys(incomeTaxTables[taxYearIndex].incomeTax);
	const hasBonus = annualBonus > 0;
	annualBonus = hasBonus ? annualBonus : 0;
	const calculateTax = income => {
		let taxDue = 0;

		taxBands.forEach(taxBand => {
			const { rate, min: minimum, max } = incomeTaxTables[taxYearIndex].incomeTax[taxBand];
			const bandAdjustment = minimum === 0 ? 0 : 1;
			const min = minimum - bandAdjustment;

			if (income >= min) {
				if (max === undefined) {
					const tax = (income - min) * (rate / 100);
					taxDue += tax;
				} else if (income >= max) {
					const tax = (max - min) * (rate / 100);
					taxDue += tax;
				} else {
					const tax = (income - min) * (rate / 100);
					taxDue += tax;
				}
			}
		});

		return taxDue;
	};

	const annualTax = calculateTax(eoy ? taxableIncome : (taxableIncome - annualBonus) * 12);
	const annualWithBonus =
		hasBonus && calculateTax((taxableIncome - annualBonus) * 12 + annualBonus);
	const bonusTax = hasBonus ? annualWithBonus - annualTax : 0;
	const finalAnnual = annualTax + bonusTax - credits * (eoy ? 1 : 12);
	const finalMonthly = annualTax / 12 + bonusTax - credits;

	return {
		incomeTax: finalMonthly > 0 ? finalMonthly : 0,
		annualIncomeTax: finalAnnual > 0 ? finalAnnual : 0
	};
}
