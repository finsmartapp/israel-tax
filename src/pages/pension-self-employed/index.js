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
const { reducedRate, fullRate } = taxData[currentYearIndex].pension.legalMin.selfEmployed;
const averageWage = taxData[currentYearIndex].bituachLeumi.averageSalary;
const averageWageHalf = averageWage / 2;
const reducedMax = averageWageHalf * (reducedRate / 100);
const fullMax = averageWageHalf * (fullRate / 100);
//Tax relief calculations
const { taxDeductableLimit, taxCreditLimit, taxCreditRate, eligibleIncome, ceiling } =
	taxData[currentYearIndex].pension.taxRelief.selfEmployed;
const deductableDecimal = taxDeductableLimit / 100;
const creditDecimal = taxCreditLimit / 100;
const tierLimit = ceiling / 2;
const maxContribution = tierLimit * (deductableDecimal + creditDecimal);
const beneficiaryPayment =
	taxData[currentYearIndex].bituachLeumi.averageSalary * 0.16 * 12 - maxContribution;
const recognisedExpense = tierLimit * (taxDeductableLimit / 100);
const taxCredit = tierLimit * (taxCreditLimit / 100) * (taxCreditRate / 100);

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
					taxDeductableLimit={taxDeductableLimit}
					taxCreditLimit={taxCreditLimit}
					eligibleIncome={eligibleIncome}
					ceiling={ceiling}
					maxContribution={maxContribution}
					beneficiaryPayment={beneficiaryPayment}
					recognisedExpense={recognisedExpense}
					taxCredit={taxCredit}
				/>
				<SelfEmployedPensionTaxReliefExamples
					eligibleIncome={eligibleIncome}
					taxDeductableLimit={taxDeductableLimit}
					taxCreditLimit={taxCreditLimit}
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
