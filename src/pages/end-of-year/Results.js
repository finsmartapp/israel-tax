import React from 'react';
import { globalProps, payrollProps } from '../../prop-types/index';
import { Table } from 'react-bootstrap';
import {
	incomeTaxCalc,
	bituachLeumiCalc,
	niDeductableSelfEmpCalc,
	pensionMinCalc,
	pensionContributionCalc,
	pensionReliefCalcSelfEmp,
	studyFundAllowances,
	studyFundCalc,
	incomeTaxBandsCalc,
	niDeductableAdvanceSelfEmpCalc
} from '../../utils/tax-calculators';
import { formatCurrency } from '../../utils/formatCurrency';
import TableBreakdown from '../../components/table-breakdown';
//Cards
import { bituachLeumiAdvances } from '../net-pay/info-cards/SelfEmpCards';
import { pensionUnder } from './info-cards';
import { pensionOver } from './info-cards';
import { studyUnder } from './info-cards';
import { studyOver } from './info-cards';
import { studyUnderGains } from './info-cards';
import { studyOverGains } from './info-cards';

function EndOfYearResults(props) {
	const taxData = props.taxData;
	const {
		taxYearIndex,
		income,
		expenses,
		profit,
		creditPoints,
		bituachLeumiAdvance,
		pensionOption,
		pensionType,
		pensionAmount,
		studyFundOption,
		studyFundType,
		studyFundAmount,
		showResultsTable,
		showExtended
	} = props.stateData;
	const handleClick = props.handleClick;
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
	const totalbituachLeumiAdvance = total(bituachLeumiAdvance);
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
	const {
		pensionTaxDeductible,
		pensionTaxCredit,
		maxContribution: maxPensionContribution
	} = pensionReliefCalcSelfEmp(taxData, taxYearIndex, totalProfit, pensionContribution, eoy);
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
	const bituachLeumiDeductible = niDeductableSelfEmpCalc(taxData, taxYearIndex, taxableIncome, eoy);
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
	const niIncomeTaxDeductable = niDeductableAdvanceSelfEmpCalc(
		taxData,
		taxYearIndex,
		totalbituachLeumiAdvance,
		eoy
	);
	const incomeTaxTaxableIncome = taxableIncome - niIncomeTaxDeductable;
	const credits = creditPointsTaxCredit + pensionTaxCredit;
	const { annualIncomeTax: grossIncomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		incomeTaxTaxableIncome,
		0,
		0,
		employmentType,
		eoy
	);
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
	const capitalGainsLimit = taxData[taxYearIndex].studyFund.selfEmployed.capitalGainsLimit;

	return (
		<>
			{showResultsTable && (
				<section>
					<h2 ref={props.scrollPoint}>Results</h2>
					{/* Cards */}
					{bituachLeumiAdvance <= 0 && bituachLeumiAdvances()}
					{pensionContribution < maxPensionContribution &&
						pensionUnder(maxPensionContribution - pensionContribution)}
					{pensionContribution > maxPensionContribution &&
						pensionOver(pensionContribution - maxPensionContribution)}
					{studyFundContribution < studyFundTaxAllowance &&
						studyUnder(studyFundTaxAllowance - studyFundContribution)}
					{studyFundContribution > studyFundTaxAllowance &&
						studyOver(studyFundContribution - studyFundTaxAllowance)}
					{studyFundContribution >= studyFundTaxAllowance &&
						studyFundContribution < capitalGainsLimit &&
						studyUnderGains(capitalGainsLimit - studyFundContribution)}
					{studyFundContribution > capitalGainsLimit &&
						studyOverGains(studyFundContribution - capitalGainsLimit)}
					{/* End Cards */}
					<button
						className='btn-link'
						aria-pressed={showExtended ? 'true' : 'false'}
						onClick={handleClick}
					>
						View {showExtended ? 'Summary' : 'Extended'} Results
					</button>
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
							{showExtended && (
								<>
									<tr>
										<td>National Insurance Advance Deductable</td>
										<td>{formatCurrency('il', niIncomeTaxDeductable)}</td>
									</tr>

									<tr>
										<td>Pension Tax Deductible</td>
										<td>{formatCurrency('il', pensionTaxDeductible)}</td>
									</tr>
									<tr>
										<td>Study Fund Tax Deductible</td>
										<td>{formatCurrency('il', studyFundTaxDeductible)}</td>
									</tr>
									<tr>
										<td>Taxable Income: Income Tax</td>
										<td>{formatCurrency('il', incomeTaxTaxableIncome)}</td>
									</tr>

									<tr>
										<td>Gross Tax</td>
										<td>{formatCurrency('il', grossIncomeTax)}</td>
									</tr>
									<tr>
										<td>Pension Tax Credit</td>
										<td>{formatCurrency('il', pensionTaxCredit)}</td>
									</tr>
									<tr>
										<td>Tax Points Credit</td>
										<td>{formatCurrency('il', creditPointsTaxCredit)}</td>
									</tr>
								</>
							)}
							<TableBreakdown
								rowHeader={'Income Tax'}
								annualTotal={incomeTax}
								monthBreakdown={monthlyBandPayments}
								annualBreakdown={annualBandPayments}
								eoy={eoy}
							/>
							{showExtended && (
								<>
									<tr>
										<td>National Insurance Deductable</td>
										<td>{formatCurrency('il', bituachLeumiDeductible)}</td>
									</tr>
									<tr>
										<td>Taxable Income: Bituach Leumi</td>
										<td>{formatCurrency('il', taxableIncome - bituachLeumiDeductible)}</td>
									</tr>
								</>
							)}
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
							<tr className='table__total'>
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
	scrollPoint: globalProps.scrollPoint,
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
		showResultsTable: globalProps.showResultsTable,
		bituachLeumiAdvance: payrollProps.bituachLeumiAdvance,
		showExtended: payrollProps.showExtended
	}),
	handleClick: globalProps.handleClick
};

export default EndOfYearResults;
