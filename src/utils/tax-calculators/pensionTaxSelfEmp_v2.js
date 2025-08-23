//IN THIS VERSION TAX RELIEF IS GIVEN ON BENEFICIARY PAYMENT.
//IT DOES NOT ALIGNS WITH ALTSHULER PENSION PUBISHED RULES - BUT HAS BEEN APPLIED IN A PREVIOUS ANNUAL REPORT.

export function pensionTaxReliefCalc(taxData, taxYearIndex, income, pensionContribution, eoy) {
	//Tax benefit available to a fixed percentage of profit up to a ceiling. Part of that can be deducted as an expense
	//and the remaining as a tax credit, up to ceilings. Different calculation methods depending on
	//profit and contribution amounts.

	const prorata = eoy ? 1 : 12;
	income = income * prorata;
	pensionContribution = eoy ? pensionContribution : pensionContribution * 12;
	const { taxDeductibleMaxPercent, taxCreditMaxPercent, taxCreditRate, eligibleIncome, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	//Determine calculation type
	//Up to the eligible income tax relief is calculated on whole amount - above it's tiered
	const isUnderEligibleIncomeThreshold = income <= eligibleIncome;
	const beneficiaryContribution = taxData[taxYearIndex].bituachLeumi.averageSalary * 0.16 * 12;
	const isBeneficiary = pensionContribution > beneficiaryContribution;
	//End
	//Baseline limits
	const maxDeductibleForIncome = income * (taxDeductibleMaxPercent / 100);
	const maxCreditForIncome = income * (taxCreditMaxPercent / 100);
	//End
	//Tier baselines
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
		//Credit is given on the noneDeductible in some instances, although it shouldn't be acorrding to Altshuler.
		// can just be deleted if needed.
		const fee = tier1 ? 0 : noneDeductible;

		if (contribution >= maxDeductible + maxCredit + fee) {
			deductible += maxDeductible;
			credit += maxCredit;
		} else if (contribution > maxDeductible + fee) {
			deductible += maxDeductible;
			if (fee > 0) {
				credit +=
					contribution - maxDeductible >= maxCredit ? maxCredit : contribution - maxDeductible;
			} else {
				credit += contribution - maxDeductible;
			}
		} else {
			deductible += contribution - fee;
			credit += fee;
		}
	};

	const tierContibutions = () => {
		tierTaxRelief(pensionContribution, true);
		const tierTwoContribution = pensionContribution - (maxDeductibleForTier + maxCreditForTier);

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
