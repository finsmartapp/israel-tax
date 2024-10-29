//IN THIS VERSION TAX RELIEF IS NOT GIVEN ON BENEFICIARY PAYMENT.
//IT ALIGNS WITH ALTSHULER PENSION PUBISHED RULES.

export function pensionTaxReliefCalc(taxData, taxYearIndex, income, pensionContribution, eoy) {
	//Tax benefit available to a fixed percentage of profit up to a ceiling. Part of that can be deducted as an expense
	//and the remaining as a tax credit, up to ceilings. Different calculation methods depending on
	//profit and contribution amounts.

	const prorata = eoy ? 1 : 12;
	income = income * prorata;
	pensionContribution = eoy ? pensionContribution : pensionContribution * 12;
	const { taxDeductableMaxPercent, taxCreditMaxPercent, taxCreditRate, eligibleIncome, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	//Start determine calculation type
	//Up to the eligible income tax relief is calculated on whole amount - above it's tiered
	const isUnderEligibleIncomeThreshold = income <= eligibleIncome;
	const beneficiaryContribution = taxData[taxYearIndex].bituachLeumi.averageSalary * 0.16 * 12;
	const isBeneficiary = pensionContribution > beneficiaryContribution;
	//End
	//Start baseline limits
	const maxDeductableForIncome = income * (taxDeductableMaxPercent / 100);
	const maxCreditForIncome = income * (taxCreditMaxPercent / 100);
	//End
	//Start tier baselines
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

	let deductible = 0;
	let credit = 0;

	const eligibleIncomeTaxReleif = () => {
		if (pensionContribution >= maxDeductableForIncome + maxCreditForIncome) {
			deductible = maxDeductableForIncome;
			credit = maxCreditForIncome;
		} else if (pensionContribution > maxDeductableForIncome) {
			deductible = maxDeductableForIncome;
			credit = pensionContribution - maxDeductableForIncome;
		} else {
			deductible = pensionContribution;
		}
	};

	const tierTaxRelief = (contribution, tier1) => {
		const maxDeductable = tier1 ? maxDeductableForTier : maxDeductableTier2;
		const maxCredit = tier1 ? maxCreditForTier : maxCreditTier2;

		if (contribution >= maxDeductable + maxCredit) {
			deductible += maxDeductable;
			credit += maxCredit;
		} else if (contribution > maxDeductable) {
			deductible += maxDeductable;
			credit += contribution - maxDeductable;
		} else {
			deductible += contribution;
		}
	};

	const tierContibutions = () => {
		tierTaxRelief(pensionContribution, true);
		const tierTwoContribution = pensionContribution - beneficiaryContribution;

		isBeneficiary && tierTaxRelief(tierTwoContribution, false);
	};

	isUnderEligibleIncomeThreshold ? eligibleIncomeTaxReleif() : tierContibutions();

	const maxContribution = () => {
		if (isUnderEligibleIncomeThreshold) {
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
		pensionTaxDeductible: deductible / prorata,
		pensionTaxCredit: (credit * (taxCreditRate / 100)) / prorata,
		maxContribution: maxContribution() / prorata
	};
}
