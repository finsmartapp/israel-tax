import React from 'react';
import { globalProps, payrollProps } from '../../prop-types/index';
import { Table } from 'react-bootstrap';
import {
	incomeTaxCalc,
	bituachLeumiCalc,
	nationalInsuranceSelfEmp,
	pensionMinCalc,
	pensionContributionCalc,
	pensionReliefCalcSelfEmp,
	studyFundAllowances,
	studyFundCalc,
	incomeTaxBandsCalc
} from '../../utils/tax-calculators';
import { formatCurrency } from '../../utils/formatCurrency';
import TableBreakdown from '../../components/table-breakdown';

function EndOfYearResults(props) {
	const taxData = props.taxData;
	const {
		taxYearIndex,
		income,
		expenses,
		profit,
		creditPoints,
		pensionOption,
		pensionType,
		pensionAmount,
		studyFundOption,
		studyFundType,
		studyFundAmount,
		showResultsTable
	} = props.stateData;
	const total = array => {
		const filteredArray = array.filter(Boolean);

		if (filteredArray.length === 0 && filteredArray[0] === undefined) {
			return 0;
		} else {
			return filteredArray.reduce((previousValue, currentValue) => previousValue + currentValue);
		}
	};
	const totalIncome = total(income);
	const totalExpenses = total(expenses);
	const totalProfit = total(profit);
	const creditPointsTaxCredit = total(creditPoints) * taxData[taxYearIndex].creditPoint;
	const employmentType = 'selfEmployed';
	const eoy = true;
	const pensionLegalMin = pensionMinCalc(taxData, taxYearIndex, totalProfit, employmentType, eoy);
	const pensionContribution = pensionContributionCalc(
		profit,
		pensionLegalMin,
		pensionOption,
		pensionAmount,
		pensionType,
		eoy
	);
	const { pensionTaxDeductible, pensionTaxCredit } = pensionReliefCalcSelfEmp(
		taxData,
		taxYearIndex,
		totalProfit,
		pensionContribution,
		eoy
	);
	const studyFundTaxAllowance = studyFundAllowances(
		taxData,
		taxYearIndex,
		totalProfit,
		employmentType,
		eoy
	);
	const { studyFundContribution, studyFundTaxDeductible } = studyFundCalc(
		profit,
		employmentType,
		studyFundAmount,
		studyFundType,
		studyFundTaxAllowance,
		studyFundOption,
		eoy
	);
	const taxableIncome = totalProfit - studyFundTaxDeductible - pensionTaxDeductible;
	const bituachLeumiDeductible = nationalInsuranceSelfEmp(
		taxData,
		taxYearIndex,
		taxableIncome,
		eoy
	);
	const { month: nationalInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome - bituachLeumiDeductible,
		'nationalInsurance',
		0,
		false,
		eoy
	);
	const { month: healthInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome - bituachLeumiDeductible,
		'healthInsurance',
		0,
		false,
		eoy
	);
	const incomeTaxTaxableIncome =
		taxableIncome -
		nationalInsurance *
			(taxData[taxYearIndex].bituachLeumi.selfEmployedNationalInsuranceDiscount / 100);
	const credits = creditPointsTaxCredit + pensionTaxCredit;
	const { annualIncomeTax: incomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		incomeTaxTaxableIncome,
		0,
		credits,
		employmentType,
		eoy
	);
	const { monthlyBandPayments, annualBandPayments } = incomeTaxBandsCalc(
		taxData,
		taxYearIndex,
		incomeTax
	);

	// console.log('monthlyBandPayments 1', monthlyBandPayments);
	// console.log('annualBandPayments 1', annualBandPayments);

	return (
		<>
			{showResultsTable && (
				<section ref={props.resultsTable}>
					<h2>Results</h2>
					<Table striped bordered className='table--col-2'>
						<thead>
							<tr className='table__row-header table__row-header--primary'>
								<th></th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{totalIncome > 0 && (
								<tr>
									<td>Income</td>
									<td>{formatCurrency('il', totalIncome)}</td>
								</tr>
							)}
							{totalExpenses > 0 && (
								<tr>
									<td>Expenses</td>
									<td>{formatCurrency('il', totalExpenses)}</td>
								</tr>
							)}
							<tr>
								<td>Profit</td>
								<td>{formatCurrency('il', totalProfit)}</td>
							</tr>
							<tr>
								<td>Taxable Income</td>
								<td>{formatCurrency('il', incomeTaxTaxableIncome)}</td>
							</tr>
							<TableBreakdown
								rowHeader={'Income Tax'}
								annualTotal={incomeTax}
								monthBreakdown={monthlyBandPayments}
								annualBreakdown={annualBandPayments}
								eoy={eoy}
							/>
							<tr>
								<td>National Insurance</td>
								<td>{formatCurrency('il', nationalInsurance)}</td>
							</tr>
							<tr>
								<td>Health insurance</td>
								<td>{formatCurrency('il', healthInsurance)}</td>
							</tr>
							<tr>
								<td>Pension</td>
								<td>{formatCurrency('il', pensionContribution)}</td>
							</tr>
							{studyFundContribution > 0 && (
								<tr>
									<td>Study Fund</td>
									<td>{formatCurrency('il', studyFundContribution)}</td>
								</tr>
							)}
							<tr className='table_total'>
								<td>Net</td>
								<td>
									{' '}
									{formatCurrency(
										'il',
										totalProfit -
											incomeTax -
											nationalInsurance -
											healthInsurance -
											pensionContribution -
											studyFundContribution
									)}
								</td>
							</tr>
						</tbody>
					</Table>
				</section>
			)}
		</>
	);
}

EndOfYearResults.propTypes = {
	resultsTable: globalProps.resultsTable,
	taxData: payrollProps.taxData,
	stateData: globalProps.shape({
		taxYearIndex: payrollProps.taxYearIndex,
		income: payrollProps.income,
		expenses: payrollProps.expenses,
		profit: payrollProps.profit,
		creditPoints: payrollProps.creditPoints,
		pensionOption: payrollProps.pensionOption,
		pensionType: payrollProps.pensionType,
		pensionAmount: payrollProps.pensionAmount,
		studyFundOption: payrollProps.studyFundOption,
		studyFundType: payrollProps.studyFundType,
		studyFundAmount: payrollProps.studyFundAmount,
		showResultsTable: globalProps.showResultsTable
	})
};

export default EndOfYearResults;
