export function bituachLeumiCalc(
	taxData,
	taxYearIndex,
	employmentType,
	taxableIncome,
	prisa,
	annualBonus,
	insuranceType
) {
	//Batuach Leumi uses monthly tax bands
	//Bonus calculated separatly to ensure tax that month isn't multipled by 12 for yearly total
	//If a payment's received over x percent of the usually monthly amount, prisa splits it over the last 12 months to ensure tax is paid (doesn't take you over BL tax-free limit), but deducted from current month

	let incomes = [taxableIncome - annualBonus, taxableIncome];
	prisa && incomes.push(((taxableIncome - annualBonus) * 12 + annualBonus) / 12);
	let taxes = [];

	incomes.forEach(income => {
		let taxDue = 0;
		const taxBands = Object.keys(taxData[taxYearIndex].bituachLeumi[insuranceType]);

		taxBands.forEach(taxBand => {
			let { min, max } = taxData[taxYearIndex].bituachLeumi[insuranceType][taxBand];
			let rate = taxData[taxYearIndex].bituachLeumi[insuranceType][taxBand].rate[employmentType];
			let bandAdjustment;
			//Adjust as min band is inclusive and is lost during x - min
			min === 0 ? (bandAdjustment = 0) : (bandAdjustment = 1);

			if (income >= min) {
				if (income >= max) {
					taxDue += (max - min + bandAdjustment) * (rate / 100);
				} else {
					taxDue += (income - min + bandAdjustment) * (rate / 100);
				}
			}
		});

		taxes.push(taxDue);
	});

	const basicTax = taxes[0];
	const taxOnBonus = taxes[1] - taxes[0];
	const prisaTax = taxes[2];

	if (prisa) {
		return {
			month: basicTax + (prisaTax - basicTax) * 12,
			annual: prisaTax * 12
		};
	} else {
		return {
			month: basicTax + taxOnBonus,
			annual: basicTax * 12 + taxOnBonus
		};
	}
}
