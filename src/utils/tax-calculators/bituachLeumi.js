export function bituachLeumiCalc(
	taxData,
	taxYearIndex,
	employmentType,
	taxableIncome,
	prisa,
	annualBonus,
	insuranceType,
	eoy
) {
	//Batuach Leumi uses monthly tax bands
	//Bonus calculated separatly to ensure tax that month isn't multipled by 12 for yearly total
	//If a payment's received over x percent of the usually monthly amount, prisa splits it over the last 12 months to ensure tax is paid (doesn't take you over BL tax-free limit), but deducted from current month

	let incomes =
		employmentType === 'selfEmployed'
			? [taxableIncome]
			: [taxableIncome - annualBonus, taxableIncome];
	prisa && incomes.push(((taxableIncome - annualBonus) * 12 + annualBonus) / 12);
	const bonus = annualBonus > 0 && true;
	let taxes = [];

	incomes.forEach(income => {
		let taxDue = 0;
		const taxBands = Object.keys(taxData[taxYearIndex].bituachLeumi[insuranceType]);
		const months = eoy ? 12 : 1;

		taxBands.forEach(taxBand => {
			const { min, max } = taxData[taxYearIndex].bituachLeumi[insuranceType][taxBand];
			const minProrata = min * months;
			const maxProrata = max * months;
			const rate = taxData[taxYearIndex].bituachLeumi[insuranceType][taxBand].rate[employmentType];
			let bandAdjustment;
			//Adjust as min band is inclusive and is lost during x - min
			minProrata === 0 ? (bandAdjustment = 0) : (bandAdjustment = 1);

			if (income >= minProrata) {
				if (income >= maxProrata) {
					taxDue += (maxProrata - minProrata + bandAdjustment) * (rate / 100);
				} else {
					taxDue += (income - minProrata + bandAdjustment) * (rate / 100);
				}
			}
		});

		taxes.push(taxDue);
	});

	const basicTax = taxes[0];
	const taxOnBonus = bonus ? taxes[1] - taxes[0] : 0;
	const prisaTax = prisa ? taxes[2] : 0;

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
