import React from 'react';
import { globalProps, payrollProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import {
	bituachLeumiCalc,
	pensionMinCalc,
	pensionContributionCalc,
	pensionReliefCalc,
	studyFundCalc,
	incomeTaxCalc,
	incomeTaxBandsCalc
} from '../../utils/tax-calculators';
import { formatCurrency } from '../../utils/formatCurrency';
import { cardAllowancePopup } from './Popups';
import TableBreakdown from '../../components/table-breakdown';

function NetPayResultsEmployee(props) {
	const taxData = props.taxData;
	const {
		taxYearIndex,
		baseIncome,
		creditPoints,
		pensionOption,
		pensionAmount,
		studyFundType,
		studyFundAmount,
		travelAllowance,
		foodAllowance,
		otherAllowance,
		overtime,
		annualBonus,
		commission,
		showResultsTable
	} = props.stateData;
	const employmentType = props.employmentType;
	const studyFundContribution = studyFundCalc(
		baseIncome,
		employmentType,
		studyFundAmount,
		studyFundType
	);
	let taxableIncome = 0;
	[
		baseIncome,
		travelAllowance,
		foodAllowance,
		otherAllowance,
		annualBonus,
		commission,
		overtime
	].forEach(e => {
		taxableIncome += typeof e === 'number' && e;
	});
	const pensionableIncome = taxableIncome - travelAllowance - annualBonus - overtime;
	const paycheckGross = taxableIncome - foodAllowance;
	const prisa = annualBonus > (taxableIncome - annualBonus) * 0.25;
	const { month: nationalInsurance, annual: annualNationalInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome,
		'nationalInsurance',
		annualBonus,
		prisa
	);
	const { month: healthInsurance, annual: annualHealthInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome,
		'healthInsurance',
		annualBonus,
		prisa
	);
	const creditPointsTaxCredit = creditPoints * taxData[taxYearIndex].creditPoint;
	const pensionLegalMin = pensionMinCalc(taxData, taxYearIndex, pensionableIncome, employmentType);
	const pensionContribution = pensionContributionCalc(
		pensionableIncome,
		pensionLegalMin,
		pensionOption,
		pensionAmount
	);
	const pensionTaxCredit = pensionReliefCalc(
		taxData,
		taxYearIndex,
		pensionContribution,
		pensionableIncome
	);
	const credits = creditPointsTaxCredit + pensionTaxCredit;
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		taxableIncome,
		annualBonus,
		credits,
		employmentType
	);
	const { monthlyBandPayments, annualBandPayments } = incomeTaxBandsCalc(
		taxData,
		taxYearIndex,
		annualIncomeTax,
		incomeTax
	);

	return (
		<>
			{showResultsTable && (
				<section ref={props.resultsTable}>
					<h2>Results</h2>
					<Table striped bordered className='table--col-3'>
						<thead>
							<tr className='table__row-header table__row-header--primary'>
								<th></th>
								<th>Month</th>
								<th>Year</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Basic Salary</td>
								<td>{formatCurrency('il', baseIncome)}</td>
								<td>{formatCurrency('il', baseIncome * 12)}</td>
							</tr>
							<tr>
								<td>Taxable Income</td>
								<td>{formatCurrency('il', taxableIncome)}</td>
								<td>{formatCurrency('il', (taxableIncome - annualBonus) * 12 + annualBonus)}</td>
							</tr>
							<TableBreakdown
								rowHeader={'Income Tax'}
								monthTotal={incomeTax}
								annualTotal={annualIncomeTax}
								monthBreakdown={monthlyBandPayments}
								annualBreakdown={annualBandPayments}
							/>
							<tr>
								<td>National Insurance</td>
								<td>{formatCurrency('il', nationalInsurance)}</td>
								<td>{formatCurrency('il', annualNationalInsurance)}</td>
							</tr>
							<tr>
								<td>Health Insurance</td>
								<td>{formatCurrency('il', healthInsurance)}</td>
								<td>{formatCurrency('il', annualHealthInsurance)}</td>
							</tr>
							<tr>
								<td>Pension</td>
								<td>{formatCurrency('il', pensionContribution)}</td>
								<td>{formatCurrency('il', pensionContribution * 12)}</td>
							</tr>
							{studyFundContribution > 0 && (
								<tr>
									<td>Study Fund</td>
									<td>{formatCurrency('il', studyFundContribution)}</td>
									<td>{formatCurrency('il', studyFundContribution * 12)}</td>
								</tr>
							)}
							{annualBonus > 0 && (
								<tr>
									<td>Bonus</td>
									<td>{formatCurrency('il', annualBonus)}</td>
									<td>{formatCurrency('il', annualBonus)}</td>
								</tr>
							)}
							<tr className='table__total'>
								<td>Net</td>
								<td>
									{formatCurrency(
										'il',
										paycheckGross -
											incomeTax -
											nationalInsurance -
											healthInsurance -
											pensionContribution -
											studyFundContribution
									)}
								</td>
								<td>
									{formatCurrency(
										'il',
										(paycheckGross - annualBonus) * 12 +
											annualBonus -
											annualIncomeTax -
											annualNationalInsurance -
											annualHealthInsurance -
											(pensionContribution + studyFundContribution) * 12
									)}
								</td>
							</tr>
						</tbody>
					</Table>
				</section>
			)}
			<>{foodAllowance > 0 && showResultsTable === true && cardAllowancePopup(foodAllowance)}</>
		</>
	);
}

NetPayResultsEmployee.propTypes = {
	employmentType: globalProps.employmentType,
	resultsTable: globalProps.resultsTable,
	taxData: payrollProps.taxData,
	stateData: globalProps.shape({
		taxYearIndex: payrollProps.taxYearIndex,
		baseIncome: payrollProps.baseIncome,
		creditPoints: payrollProps.creditPoints,
		pensionOption: payrollProps.pensionOption,
		pensionAmount: payrollProps.pensionAmount,
		studyFundType: payrollProps.studyFundType,
		studyFundAmount: payrollProps.studyFundAmount,
		travelAllowance: payrollProps.travelAllowance,
		foodAllowance: payrollProps.foodAllowance,
		otherAllowance: payrollProps.otherAllowance,
		overtime: payrollProps.overtime,
		annualBonus: payrollProps.annualBonus,
		commission: payrollProps.commission,
		showResultsTable: globalProps.showResultsTable
	})
};

export default NetPayResultsEmployee;
