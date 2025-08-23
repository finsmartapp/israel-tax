//IN THIS VERSION TAX RELIEF IS NOT GIVEN ON BENEFICIARY PAYMENT.
//IT ALIGNS WITH ALTSHULER PENSION PUBISHED RULES.

export function pensionTaxReliefCalc(taxData, taxYearIndex, income, pensionContribution, eoy) {
	//Tax benefit available to a fixed percentage of profit up to a ceiling. Part of that can be deducted as an expense
	//and the remaining as a tax credit, up to ceilings. Different calculation methods depending on
	//profit and contribution amounts.

	const prorata = eoy ? 1 : 12;
	income = income * prorata;
	pensionContribution = eoy ? pensionContribution : pensionContribution * 12;
	const { taxDeductibleMaxPercent, taxCreditMaxPercent, taxCreditRate, eligibleIncome, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	//Start determine calculation type
	//Up to the eligible income tax relief is calculated on whole amount - above it's tiered
	const isUnderEligibleIncomeThreshold = income <= eligibleIncome;
	const beneficiaryContribution = taxData[taxYearIndex].bituachLeumi.averageSalary * 0.16 * 12;
	const isBeneficiary = pensionContribution > beneficiaryContribution;
	//End
	//Start baseline limits
	const maxDeductibleForIncome = income * (taxDeductibleMaxPercent / 100);
	const maxCreditForIncome = income * (taxCreditMaxPercent / 100);
	//End
	//Start tier baselines
	//Tier 1 is calculated on whole amount
	//Eligible for tier two if beneficiary
	const incomeExceedsCeiling = income > ceiling;
	const maxDeductibleForTier = (ceiling * (taxDeductibleMaxPercent / 100)) / 2;
	const maxCreditForTier = (ceiling * (taxCreditMaxPercent / 100)) / 2;
	const noneDeductible = beneficiaryContribution - maxDeductibleForTier - maxCreditForTier;
	const maxDeductibleTier2 = incomeExceedsCeiling
		? maxDeductibleForTier
		: maxDeductibleForIncome - maxDeductibleForTier;
	const maxCreditTier2 = incomeExceedsCeiling
		? maxCreditForTier
		: maxCreditForIncome - maxCreditForTier;
	//End

	let deductible = 0;
	let credit = 0;

	const eligibleIncomeTaxReleif = () => {
		if (pensionContribution >= maxDeductibleForIncome + maxCreditForIncome) {
			deductible = maxDeductibleForIncome;
			credit = maxCreditForIncome;
		} else if (pensionContribution > maxDeductibleForIncome) {
			deductible = maxDeductibleForIncome;
			credit = pensionContribution - maxDeductibleForIncome;
		} else {
			deductible = pensionContribution;
		}
	};

	const tierTaxRelief = (contribution, tier1) => {
		const maxDeductible = tier1 ? maxDeductibleForTier : maxDeductibleTier2;
		const maxCredit = tier1 ? maxCreditForTier : maxCreditTier2;

		if (contribution >= maxDeductible + maxCredit) {
			deductible += maxDeductible;
			credit += maxCredit;
		} else if (contribution > maxDeductible) {
			deductible += maxDeductible;
			credit += contribution - maxDeductible;
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
			return maxDeductibleForIncome + maxCreditForIncome;
		} else {
			return (
				maxDeductibleForTier +
				maxCreditForTier +
				maxDeductibleTier2 +
				maxCreditTier2 +
				noneDeductible
			);
		}
	};

	return {
		pensionTaxDeductible: deductible / prorata,
		pensionTaxCredit: (credit * (taxCreditRate / 100)) / prorata,
		maxContribution: maxContribution() / prorata
	};
}
