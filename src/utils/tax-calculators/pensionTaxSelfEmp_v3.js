//IN THIS VERSION THE BENEFICIARY IS ELIGIBLE FOR TAX CREDIT BUT NOT FOR TAX DEDUCTIION.
//MUST STILL MAKE THE PAYMENT BEFORE UNLOCKING TIER 2 AND ANY RELIEF (TAX/CREDIT)
//TIERS WHERE INITIAL 7% AND 4% PAYMENTS BEFORE UNLOCKING MORE

import pensionTables from '../../data/pension.json';
export function pensionTaxReliefCalc(taxYearIndex, income, pensionContribution, eoy) {
	//Tax benefit available to a fixed percentage of profit up to a ceiling. Part of that can be deducted as an expense
	//and the remaining as a tax credit, up to ceilings. Different calculation methods depending on
	//profit and contribution amounts.

	const prorata = eoy ? 1 : 12;
	income = income * prorata;
	pensionContribution = eoy ? pensionContribution : pensionContribution * 12;

	const { taxDeductibleMaxPercent, taxCreditMaxPercent, taxCreditRate, eligibleIncome, ceiling } =
		pensionTables[taxYearIndex].taxRelief.selfEmployed;

	//Start determine calculation type
	//Up to the eligible income tax relief is calculated on whole amount - above it's tiered
	const isUnderEligibleIncomeThreshold = income <= eligibleIncome;

	// Annual "beneficiary" threshold (amit-motav)
	const beneficiaryContribution = pensionTables[taxYearIndex].averageSalary * 0.16 * 12;

	const isBeneficiary = pensionContribution > beneficiaryContribution;
	//End
	//Start baseline limits
	const maxDeductibleForIncome = income * (taxDeductibleMaxPercent / 100); // 11% total
	const maxCreditForIncome = income * (taxCreditMaxPercent / 100); // 5% or 5.5% total
	//End
	//Start tier baselines
	const incomeExceedsCeiling = income > ceiling;

	// Split the ceiling to two equal tiers
	const tier1IncomeCap = Math.min(income, ceiling / 2);
	const tier2IncomeCap = Math.max(0, Math.min(income, ceiling) - tier1IncomeCap);

	const maxDeductibleForTier = (ceiling * (taxDeductibleMaxPercent / 100)) / 2; // 11% of 1/2 ceiling
	const maxCreditForTier = (ceiling * (taxCreditMaxPercent / 100)) / 2; // 5/5.5% of 1/2 ceiling

	// Deduction on Tier 2 is 7% base + possible extra 4% (only after 12% trigger)
	const tier2BaseDeductPercent = 0.07;
	const tier2ExtraDeductPercent = 0.04;
	const tier2TriggerPercent = 0.12;

	const maxDeductibleTier2 = incomeExceedsCeiling
		? maxDeductibleForTier
		: maxDeductibleForIncome - maxDeductibleForTier; // overall 11% headroom on Tier 2

	const maxCreditTier2 = incomeExceedsCeiling
		? maxCreditForTier
		: maxCreditForIncome - maxCreditForTier; // credit headroom on Tier 2

	const maxDeductibleTier2Base7 = tier2IncomeCap * tier2BaseDeductPercent;
	const maxDeductibleTier2Extra4 = tier2IncomeCap * tier2ExtraDeductPercent;
	const tier2TriggerAmount = tier2IncomeCap * tier2TriggerPercent;

	let deductible = 0; // base for deduction (before applying marginal rate)
	let credit = 0; // base for credit (before applying 35%)

	const clampNonNegative = value => Math.max(0, value);

	const eligibleIncomeTaxReleif = () => {
		// Single-bucket regime (no tiers, no beneficiaryContribution rules)
		if (pensionContribution >= maxDeductibleForIncome + maxCreditForIncome) {
			deductible = maxDeductibleForIncome;
			credit = maxCreditForIncome;
		} else if (pensionContribution > maxDeductibleForIncome) {
			deductible = maxDeductibleForIncome;
			credit = Math.min(pensionContribution - maxDeductibleForIncome, maxCreditForIncome);
		} else {
			deductible = pensionContribution;
		}
	};

	const tierTaxRelief = (contribution, tier1) => {
		// Generic tier allocator: allocate to deduction first (up to cap), then to credit (up to cap)
		const maxDeductible = tier1 ? maxDeductibleForTier : maxDeductibleTier2;
		const maxCredit = tier1 ? maxCreditForTier : maxCreditTier2;

		const deductRoom = clampNonNegative(maxDeductible - Math.min(deductible, maxDeductible));
		const creditRoomGlobal = clampNonNegative(maxCreditForIncome - credit);
		const creditRoomTier = Math.min(
			creditRoomGlobal,
			clampNonNegative(maxCredit - Math.min(credit, maxCredit))
		);

		if (contribution >= deductRoom + creditRoomTier) {
			deductible += deductRoom;
			credit += creditRoomTier;
		} else if (contribution > deductRoom) {
			deductible += deductRoom;
			credit += contribution - deductRoom;
		} else {
			deductible += contribution;
		}
	};

	// Replace ONLY this function in your file
	const tierTwoTaxRelief = (availableForTier2Total, tier1DeductibleUsed) => {
		// A) beneficiary remainder: never deductible, MAY fill remaining credit
		const creditRoomTotal = clampNonNegative(maxCreditForIncome - credit);
		const creditRoomTier2 = Math.min(creditRoomTotal, maxCreditTier2);

		// Only the remainder of beneficiaryContribution after Tier 1 belongs in Tier 2
		const tier1CreditUsedCapped = Math.min(maxCreditForTier, credit); // credit used on Tier 1 (capped)
		const tier1TotalUsedForGate = tier1DeductibleUsed + tier1CreditUsedCapped;
		const remainingBeneficiaryContribution = clampNonNegative(
			beneficiaryContribution - tier1TotalUsedForGate
		);

		const beneficiaryApplied = Math.min(availableForTier2Total, remainingBeneficiaryContribution);
		const creditFromBeneficiary = Math.min(beneficiaryApplied, creditRoomTier2);
		credit += creditFromBeneficiary;

		let remainingAfterBeneficiary = availableForTier2Total - beneficiaryApplied;

		// B) finish any remaining Tier-2 credit (still before any deduction)
		const creditRoomAfterBeneficiary = clampNonNegative(creditRoomTier2 - creditFromBeneficiary);
		const creditFromTier2 = Math.min(remainingAfterBeneficiary, creditRoomAfterBeneficiary);
		credit += creditFromTier2;
		remainingAfterBeneficiary -= creditFromTier2;

		// >>> KEY FIX: the 12% trigger must be checked on the Tier-2 amount
		// >>> that remains AFTER credit and AFTER the beneficiaryContribution.
		// >>> Do NOT count beneficiary or credit amounts toward the 12%.
		const availableForTier2DeductionBase = remainingAfterBeneficiary; // BEFORE allocating base 7%

		// C) allocate Tier-2 base 7% deduction
		const tier2BaseUsedSoFar = Math.max(
			0,
			Math.min(Math.max(0, deductible - tier1DeductibleUsed), maxDeductibleTier2Base7)
		);
		const tier2BaseRoom = clampNonNegative(maxDeductibleTier2Base7 - tier2BaseUsedSoFar);
		const deductibleFromTier2Base7 = Math.min(remainingAfterBeneficiary, tier2BaseRoom);
		deductible += deductibleFromTier2Base7;
		remainingAfterBeneficiary -= deductibleFromTier2Base7;

		// D) Extra 4% only if the Tier-2 NON-credit, NON-beneficiary amount reaches 12% of Tier-2 income
		// i.e., availableForTier2DeductionBase >= tier2TriggerAmount
		if (availableForTier2DeductionBase >= tier2TriggerAmount) {
			const tier2ExtraUsedSoFar = Math.max(
				0,
				Math.min(
					Math.max(0, deductible - tier1DeductibleUsed - maxDeductibleTier2Base7),
					maxDeductibleTier2Extra4
				)
			);
			const tier2ExtraRoom = clampNonNegative(maxDeductibleTier2Extra4 - tier2ExtraUsedSoFar);
			const deductibleFromTier2Extra4 = Math.min(remainingAfterBeneficiary, tier2ExtraRoom);
			deductible += deductibleFromTier2Extra4;
			remainingAfterBeneficiary -= deductibleFromTier2Extra4;
		}
		// Any remainder has no tax benefit.
	};

	const tierContibutions = () => {
		// ---- TIER 1 ----
		// Cap the amount Tier 1 can consume (11% deduction + 5/5.5% credit of Tier-1 income)
		const tier1MaxContribution =
			tier1IncomeCap * (taxDeductibleMaxPercent / 100) +
			tier1IncomeCap * (taxCreditMaxPercent / 100);

		const deductibleBeforeTier1 = deductible;
		const creditBeforeTier1 = credit;

		tierTaxRelief(Math.min(pensionContribution, tier1MaxContribution), true);

		const tier1DeductibleUsed = deductible - deductibleBeforeTier1;
		const tier1CreditUsed = credit - creditBeforeTier1;
		const tier1TotalUsed = tier1DeductibleUsed + tier1CreditUsed;

		// ---- TIER 2 ----
		const availableForTier2Total = Math.max(0, pensionContribution - tier1TotalUsed);

		if (isBeneficiary && availableForTier2Total > 0) {
			tierTwoTaxRelief(availableForTier2Total, tier1DeductibleUsed);
		}
	};

	isUnderEligibleIncomeThreshold ? eligibleIncomeTaxReleif() : tierContibutions();

	const maxContribution = () => {
		if (isUnderEligibleIncomeThreshold) {
			return maxDeductibleForIncome + maxCreditForIncome;
		} else {
			// Full 16.5% of applicable income + beneficiary remainder after Tier 1
			const tier1Max =
				tier1IncomeCap * (taxDeductibleMaxPercent / 100) +
				tier1IncomeCap * (taxCreditMaxPercent / 100);
			const beneficiaryRemainder = clampNonNegative(beneficiaryContribution - tier1Max);
			return (
				maxDeductibleForTier + // Tier-1 11%
				maxCreditForTier + // Tier-1 credit
				maxDeductibleTier2Base7 +
				maxDeductibleTier2Extra4 +
				Math.min(maxCreditTier2, Math.max(0, maxCreditForIncome - maxCreditForTier)) +
				beneficiaryRemainder
			);
		}
	};

	return {
		pensionTaxDeductible: deductible / prorata,
		pensionTaxCredit: (credit * (taxCreditRate / 100)) / prorata,
		maxContribution: maxContribution() / prorata
	};
}
