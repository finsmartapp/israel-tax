export function pensionReliefCalc(taxData, taxYearIndex, income, pensionContribution, eoy) {
	//Tax benefit available to a fixed percentage of profit up to a ceiling based. Part of that can be deducted as an expense and the remaining part a tax credit, up to ceilings. Different salary cielings and calculation methods depending on profit and contribution amounts.

	const prorata = eoy ? 1 : 12;
	income = eoy ? income : income * 12;
	pensionContribution = eoy ? pensionContribution : pensionContribution * 12;
	const { taxDeductableLimit, taxCreditLimit, taxCreditRate, eligibleIncome, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	const beneficiaryTrack = income > eligibleIncome;
	const beneficiaryContribution = taxData[taxYearIndex].bituachLeumi.averageSalary * 0.16 * 12;
	const beneficiary = pensionContribution >= beneficiaryContribution;
	//Baseline limits
	const maxDeductableIncome = income * (taxDeductableLimit / 100);
	const maxCreditIncome = income * (taxCreditLimit / 100);
	const maxDeductableEligibleIncome = eligibleIncome * (taxDeductableLimit / 100);
	const maxCreditEligibleIncome = eligibleIncome * (taxCreditLimit / 100);
	const maxDeductableCeiling = (ceiling * (taxDeductableLimit / 100)) / 2;
	const maxCreditCeiling = (ceiling * (taxCreditLimit / 100)) / 2;
	//End
	//Beneficiary baseline limits
	const incomeExceedsCeiling = income > ceiling;
	const maxDeductableIncomeTier1 = maxDeductableCeiling;
	const maxCreditIncomeTier1 = maxCreditCeiling;
	const maxDeductableIncomeTier2 = incomeExceedsCeiling
		? maxDeductableCeiling
		: (income - ceiling / 2) * (taxDeductableLimit / 100);
	const maxCreditIncomeTier2 = incomeExceedsCeiling
		? maxCreditCeiling
		: (income - ceiling / 2) * (taxCreditLimit / 100);
	//End
	//Absolute limits based on track
	const maxDeductable = beneficiaryTrack ? maxDeductableCeiling : maxDeductableEligibleIncome;
	const maxCredit = beneficiaryTrack ? maxCreditCeiling : maxCreditEligibleIncome;
	//End
	//Limits based on income total for track type
	const incomeLimitByTrack = tier => {
		let deductable;
		let credit;

		if (tier === 1) {
			deductable = maxDeductableIncomeTier1;
			credit = maxCreditIncomeTier1;
		} else if (tier === 2) {
			deductable = maxDeductableIncomeTier2;
			credit = maxCreditIncomeTier2;
		} else {
			deductable = maxDeductableIncome;
			credit = maxCreditIncome;
		}

		return {
			deductable,
			credit
		};
	};
	//End
	let totalDeductible = 0;
	let totalCredit = 0;

	const creditCalc = (contribution, tier) => {
		const { credit: creditIncomeLimit, deductable: deductableIncomeLimit } =
			incomeLimitByTrack(tier);
		const taxCreditContribution = contribution - deductableIncomeLimit;

		if (taxCreditContribution > creditIncomeLimit) {
			if (creditIncomeLimit > maxCredit) {
				totalCredit += maxCredit;
			} else {
				totalCredit += creditIncomeLimit;
			}
		} else if (taxCreditContribution > maxCredit) {
			totalCredit += maxCredit;
		} else {
			totalCredit += taxCreditContribution;
		}
	};

	const deductableCalc = (contribution, tier) => {
		const { deductable: deductableIncomeLimit } = incomeLimitByTrack(tier);

		if (contribution > deductableIncomeLimit) {
			creditCalc(contribution, tier);
			if (deductableIncomeLimit > maxDeductable) {
				totalDeductible += maxDeductable;
			} else {
				totalDeductible += deductableIncomeLimit;
			}
		} else if (contribution > maxDeductable) {
			totalDeductible += maxDeductable;
		} else {
			totalDeductible += contribution;
		}
	};

	const beneficiaryTiers = () => {
		const max = maxDeductable + maxCredit;
		const tier1 = pensionContribution > max ? max : pensionContribution;
		const noTaxBenefit = beneficiaryContribution - max;
		const remainingContribution = pensionContribution - tier1 - noTaxBenefit;
		const tier2 = remainingContribution > max ? max : remainingContribution;

		deductableCalc(tier1, 1);
		beneficiary && deductableCalc(tier2, 2);
	};

	beneficiaryTrack ? beneficiaryTiers() : deductableCalc(pensionContribution);

	return {
		pensionTaxDeductible: totalDeductible / prorata,
		pensionTaxCredit: (totalCredit * (taxCreditRate / 100)) / prorata
	};
}

//******************************************************************************** Original calc - Wait until 2021 annual report to confirm which is correct

// export function pensionReliefCalc(taxData, taxYearIndex, income, pensionContribution, eoy) {
// 	//Tax benefit available to a fixed percentage of the salary with a ceiling based on the national avaerage salary. Part of that can be deducted as an expense and the remaining part a tax credit, up to a ceiling

// 	const { taxDeductableLimit, taxCreditLimit, taxCreditRate, ceiling } =
// 		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
// 	const diminisher = eoy ? 1 : 12;
// 	const maxDeductableCeiling = (ceiling / diminisher) * (taxDeductableLimit / 100);
// 	const maxCreditCeiling = (ceiling / diminisher) * (taxCreditLimit / 100);
// 	const maxDeductableIncome = income * (taxDeductableLimit / 100);
// 	const maxCreditIncome = income * (taxCreditLimit / 100);
// 	let totalDeductible;
// 	let totalCredit = 0;

// 	const taxCreditEligible = () => {
// 		const taxCreditContribution = pensionContribution - maxDeductableIncome;

// 		if (taxCreditContribution > maxCreditIncome) {
// 			if (maxCreditIncome > maxCreditCeiling) {
// 				totalCredit = maxCreditCeiling;
// 			} else {
// 				totalCredit = maxCreditIncome;
// 			}
// 		} else if (taxCreditContribution > maxCreditCeiling) {
// 			totalCredit = maxCreditCeiling;
// 		} else {
// 			totalCredit = taxCreditContribution;
// 		}
// 	};

// 	if (pensionContribution > maxDeductableIncome) {
// 		taxCreditEligible();
// 		if (maxDeductableIncome > maxDeductableCeiling) {
// 			totalDeductible = maxDeductableCeiling;
// 		} else {
// 			totalDeductible = maxDeductableIncome;
// 		}
// 	} else if (pensionContribution > maxDeductableCeiling) {
// 		totalDeductible = maxDeductableCeiling;
// 	} else {
// 		totalDeductible = pensionContribution;
// 	}
// 	return { totalDeductible, pensionTaxCredit: totalCredit * (taxCreditRate / 100) };
// }
