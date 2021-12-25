export function pensionReliefCalc(taxData, taxYearIndex, income, pensionContribution, eoy) {
	//Tax benefit available to a fixed percentage of the salary with a ceiling based on the national avaerage salary. Part of that can be deducted as an expense and the remaining part a tax credit, up to a ceiling

	const prorata = eoy ? 1 : 12;
	income = eoy ? income : income * 12;
	pensionContribution = eoy ? pensionContribution : pensionContribution * 12;
	const { taxDeductableLimit, taxCreditLimit, taxCreditRate, eligibleIncome, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	const beneficiaryContribution = taxData[taxYearIndex].bituachLeumi.averageSalary * 0.16 * 12;

	const maxDeductableIncome = income * (taxDeductableLimit / 100);
	const maxCreditIncome = income * (taxCreditLimit / 100);

	const maxDeductableEligibleIncome = eligibleIncome * (taxDeductableLimit / 100);
	const maxCreditEligibleIncome = eligibleIncome * (taxCreditLimit / 100);

	const maxDeductableAbsolute = ceiling * (taxDeductableLimit / 100);
	const maxCreditAbsolute = ceiling * (taxCreditLimit / 100);

	const beneficiary = pensionContribution >= beneficiaryContribution && true;
	const maxDeductable =
		income <= eligibleIncome
			? maxDeductableEligibleIncome
			: beneficiary
			? maxDeductableAbsolute
			: maxDeductableAbsolute / 2;
	const maxCredit =
		income <= eligibleIncome
			? maxCreditEligibleIncome
			: beneficiary
			? maxCreditAbsolute
			: maxCreditAbsolute / 2;

	let totalDeductible = 0;
	let totalCredit = 0;

	const creditCalc = contribution => {
		const taxCreditContribution = contribution - maxDeductableIncome;

		if (taxCreditContribution > maxCreditIncome) {
			if (maxCreditIncome > maxCredit) {
				totalCredit = maxCredit;
			} else {
				totalCredit = maxCreditIncome;
			}
		} else if (taxCreditContribution > maxCredit) {
			totalCredit = maxCredit;
		} else {
			totalCredit = taxCreditContribution;
		}
	};

	const deductableCalc = contribution => {
		if (contribution > maxDeductableIncome) {
			creditCalc(contribution);
			if (maxDeductableIncome > maxDeductable) {
				totalDeductible = maxDeductable;
			} else {
				totalDeductible = maxDeductableIncome;
			}
		} else if (contribution > maxDeductable) {
			totalDeductible = maxDeductable;
		} else {
			totalDeductible = contribution;
		}
	};

	const beneficiaryTract = () => {
		const tier1 =
			pensionContribution > maxDeductable + maxCredit
				? maxDeductable + maxCredit
				: pensionContribution;
		const noTaxBenefit =
			beneficiaryContribution > tier1
				? beneficiaryContribution - tier1
				: beneficiaryContribution - maxDeductable + maxCredit / 2;
		const tier2 = pensionContribution - noTaxBenefit;

		deductableCalc(beneficiary ? tier2 : tier1);
	};

	income > eligibleIncome ? beneficiaryTract() : deductableCalc(pensionContribution);

	return {
		pensionTaxDeductible: totalDeductible / prorata,
		pensionTaxCredit: (totalCredit * (taxCreditRate / 100)) / prorata
	};
}

//Wait until 2021 annual report to confirm which is correct

// export function pensionReliefCalc(taxData, taxYearIndex, income, pensionContribution, eoy) {
// 	//Tax benefit available to a fixed percentage of the salary with a ceiling based on the national avaerage salary. Part of that can be deducted as an expense and the remaining part a tax credit, up to a ceiling

// 	const { taxDeductableLimit, taxCreditLimit, taxCreditRate, ceiling } =
// 		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
// 	const diminisher = eoy ? 1 : 12;
// 	const maxDeductableAbsolute = (ceiling / diminisher) * (taxDeductableLimit / 100);
// 	const maxCreditAbsolute = (ceiling / diminisher) * (taxCreditLimit / 100);
// 	const maxDeductableIncome = income * (taxDeductableLimit / 100);
// 	const maxCreditIncome = income * (taxCreditLimit / 100);
// 	let totalDeductible;
// 	let totalCredit = 0;

// 	const taxCreditEligible = () => {
// 		const taxCreditContribution = pensionContribution - maxDeductableIncome;

// 		if (taxCreditContribution > maxCreditIncome) {
// 			if (maxCreditIncome > maxCreditAbsolute) {
// 				totalCredit = maxCreditAbsolute;
// 			} else {
// 				totalCredit = maxCreditIncome;
// 			}
// 		} else if (taxCreditContribution > maxCreditAbsolute) {
// 			totalCredit = maxCreditAbsolute;
// 		} else {
// 			totalCredit = taxCreditContribution;
// 		}
// 	};

// 	if (pensionContribution > maxDeductableIncome) {
// 		taxCreditEligible();
// 		if (maxDeductableIncome > maxDeductableAbsolute) {
// 			totalDeductible = maxDeductableAbsolute;
// 		} else {
// 			totalDeductible = maxDeductableIncome;
// 		}
// 	} else if (pensionContribution > maxDeductableAbsolute) {
// 		totalDeductible = maxDeductableAbsolute;
// 	} else {
// 		totalDeductible = pensionContribution;
// 	}
// 	return { totalDeductible, pensionTaxCredit: totalCredit * (taxCreditRate / 100) };
// }
