import React from 'react';
import taxData from '../../data/payroll.json';
import Hero from '../../components/hero';
import PageContainer from '../../components/page-container';
import SelfEmployedPensionDeposit from './Deposit';
import SelfEmployedPensionDepositExamples from './DepositExamples';
import SelfEmployedPensionTaxRelief from './TaxRelief';
import SelfEmployedPensionTaxReliefExamples from './TaxReliefExamples';
import { currentYearIndex } from '../../utils/globalVariables';

const currentYearData = taxData[currentYearIndex];
//Contribution calculations
const { reducedRate, fullRate } = currentYearData.pension.legalMin.selfEmployed;
const averageWage = currentYearData.bituachLeumi.averageSalary;
const averageWageHalf = averageWage / 2;
const reducedMax = averageWageHalf * (reducedRate / 100);
const fullMax = averageWageHalf * (fullRate / 100);
//Tax relief calculations
const { taxDeductibleMaxPercent, taxCreditMaxPercent, taxCreditRate, eligibleIncome, ceiling } =
	currentYearData.pension.taxRelief.selfEmployed;
const deductibleDecimal = taxDeductibleMaxPercent / 100;
const creditDecimal = taxCreditMaxPercent / 100;
const tierLimit = ceiling / 2;
const maxContribution = tierLimit * (deductibleDecimal + creditDecimal);
const beneficiaryPayment = currentYearData.bituachLeumi.averageSalary * 0.16 * 12 - maxContribution;
const recognisedExpense = tierLimit * (taxDeductibleMaxPercent / 100);
const taxCredit = tierLimit * (taxCreditMaxPercent / 100) * (taxCreditRate / 100);

function SelfEmployedPension() {
	return (
		<>
			<Hero h1='Self-employed Pension' heroImage='pension' />
			<PageContainer>
				<SelfEmployedPensionDeposit
					currentYearData={currentYearData}
					averageWage={averageWage}
					reducedRate={reducedRate}
					fullRate={fullRate}
					reducedMax={reducedMax}
					fullMax={fullMax}
				/>
				<SelfEmployedPensionDepositExamples
					averageWage={averageWage}
					averageWageHalf={averageWageHalf}
					reducedRate={reducedRate}
					fullRate={fullRate}
					reducedMax={reducedMax}
					fullMax={fullMax}
				/>
				<SelfEmployedPensionTaxRelief
					taxDeductibleMaxPercent={taxDeductibleMaxPercent}
					taxCreditMaxPercent={taxCreditMaxPercent}
					eligibleIncome={eligibleIncome}
					ceiling={ceiling}
					maxContribution={maxContribution}
					beneficiaryPayment={beneficiaryPayment}
					recognisedExpense={recognisedExpense}
					taxCredit={taxCredit}
				/>
				<SelfEmployedPensionTaxReliefExamples
					eligibleIncome={eligibleIncome}
					taxDeductibleMaxPercent={taxDeductibleMaxPercent}
					taxCreditMaxPercent={taxCreditMaxPercent}
					taxCreditRate={taxCreditRate}
					taxCredit={taxCredit}
					ceiling={ceiling}
					tierLimit={tierLimit}
					recognisedExpense={recognisedExpense}
					maxContribution={maxContribution}
					beneficiaryPayment={beneficiaryPayment}
				/>
			</PageContainer>
		</>
	);
}

export default SelfEmployedPension;
