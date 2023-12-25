export function pensionTaxReliefCalc(taxData, taxYearIndex, income, pensionContribution, eoy) {
	//Tax benefit available to a fixed percentage of profit up to a ceiling. Part of that can be deducted as an expense
	//and the remaining as a tax credit, up to ceilings. Different calculation methods depending on
	//profit and contribution amounts.

	const prorata = eoy ? 1 : 12;
	income = income * prorata;
	pensionContribution = eoy ? pensionContribution : pensionContribution * 12;
	const { taxDeductableMaxPercent, taxCreditMaxPercent, taxCreditRate, eligibleIncome, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	//Determine calculation type
	//Up to the eligible income tax relief is calculated on whole amount - above it's tiered
	const isWithiinEligibleIncomeThreshold = income <= eligibleIncome;
	const beneficiaryContribution = taxData[taxYearIndex].bituachLeumi.averageSalary * 0.16 * 12;
	const isBeneficiary = pensionContribution > beneficiaryContribution;
	//End
	//Baseline limits
	const maxDeductableForIncome = income * (taxDeductableMaxPercent / 100);
	const maxCreditForIncome = income * (taxCreditMaxPercent / 100);
	//End
	//Tier baselines
	//Tier 1 is calculated on whole amount
	//Eligible for tier two if beneficiary
	const incomeExceedsCeiling = income > ceiling;
	const maxDeductableForTier = (ceiling * (taxDeductableMaxPercent / 100)) / 2;
	const maxCreditForTier = (ceiling * (taxCreditMaxPercent / 100)) / 2;
	const noneDeductable = beneficiaryContribution - maxDeductableForTier - maxCreditForTier;
	const maxDeductableTier2 = incomeExceedsCeiling
		? maxDeductableForTier
		: maxDeductableForIncome - maxDeductableForTier;
	const maxCreditTier2 = incomeExceedsCeiling
		? maxCreditForTier
		: maxCreditForIncome - maxCreditForTier;
	//End

	let deduction = 0;
	let credit = 0;

	const eligibleIncomeTaxReleif = () => {
		if (pensionContribution >= maxDeductableForIncome + maxCreditForIncome) {
			deduction = maxDeductableForIncome;
			credit = maxCreditForIncome;
		} else if (pensionContribution > maxDeductableForIncome) {
			deduction = maxDeductableForIncome;
			credit = pensionContribution - maxDeductableForIncome;
		} else {
			deduction = pensionContribution;
		}
	};

	const tierTaxRelief = (contribution, tier1) => {
		const maxDeductable = tier1 ? maxDeductableForTier : maxDeductableTier2;
		const maxCredit = tier1 ? maxCreditForTier : maxCreditTier2;
		//Credit is given on the noneDeductable in some instances, although it shouldn't be acorrding to Altshuler.
		// can just be deleted if needed.
		const fee = tier1 ? 0 : noneDeductable;

		if (contribution >= maxDeductable + maxCredit + fee) {
			deduction += maxDeductable;
			credit += maxCredit;
		} else if (contribution > maxDeductable + fee) {
			deduction += maxDeductable;
			if (fee > 0) {
				credit +=
					contribution - maxDeductable >= maxCredit ? maxCredit : contribution - maxDeductable;
			} else {
				credit += contribution - maxDeductable;
			}
		} else {
			deduction += contribution - fee;
			credit += fee;
		}
	};

	const tierContibutions = () => {
		tierTaxRelief(pensionContribution, true);
		const tierTwoContribution = pensionContribution - (maxDeductableForTier + maxCreditForTier);

		isBeneficiary && tierTaxRelief(tierTwoContribution, false);
	};

	isWithiinEligibleIncomeThreshold ? eligibleIncomeTaxReleif() : tierContibutions();

	const maxContribution = () => {
		if (isWithiinEligibleIncomeThreshold) {
			return maxDeductableForIncome + maxCreditForIncome;
		} else {
			return (
				maxDeductableForTier +
				maxCreditForTier +
				maxDeductableTier2 +
				maxCreditTier2 +
				noneDeductable
			);
		}
	};

	return {
		pensionTaxDeductible: deduction / prorata,
		pensionTaxCredit: (credit * (taxCreditRate / 100)) / prorata,
		maxContribution: maxContribution() / prorata
	};
}
