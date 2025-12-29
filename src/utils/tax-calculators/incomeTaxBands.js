import incomeTaxTables from '../../data/income-tax.json';
export function incomeTaxBandsCalc(taxYearIndex, annualTax, monthlyTax) {
	//An expetional month is where payment's received for that month only, so the annual tax can't be evenly divided
	const isExptionalMonth = monthlyTax * 12 > annualTax;

	const taxAndBand = (tax, exptionalMonth) => {
		const taxBands = Object.keys(incomeTaxTables[taxYearIndex].incomeTax);
		let counter = tax;
		let fullBands = [];
		let dividedBands = [];

		taxBands.forEach(taxBand => {
			const { rate, min, max } = incomeTaxTables[taxYearIndex].incomeTax[taxBand];
			const bandAdjustment = min === 0 ? 0 : 1;
			const minimum = exptionalMonth ? Math.round(min / 12) : min - bandAdjustment;
			const maximum = max === undefined ? Infinity : exptionalMonth ? max / 12 : max;
			const bandLimit = (maximum - minimum) * (rate / 100);

			if (counter > 0) {
				if (counter >= bandLimit) {
					fullBands.push({ [rate]: bandLimit });
					dividedBands.push({ [rate]: bandLimit / 12 });
					counter -= bandLimit;
				} else if (counter < bandLimit) {
					fullBands.push({ [rate]: counter });
					dividedBands.push({ [rate]: counter / 12 });
					counter -= counter;
				}
			}
		});

		return [fullBands, dividedBands];
	};

	const bands = taxAndBand(annualTax);
	const exptionalBands = isExptionalMonth && taxAndBand(monthlyTax, isExptionalMonth);

	return {
		monthlyBandPayments: isExptionalMonth ? exptionalBands[0] : bands[1],
		annualBandPayments: bands[0]
	};
}
