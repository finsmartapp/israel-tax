import React from 'react';
import { globalProps, taxProps } from '../../prop-types';
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
import TableBreakdown from '../../components/table-breakdown';
//Cards
import { noTaxCreditPoints } from './info-cards/EmployeeCards';
import { foodAllowanceInfo } from './info-cards/EmployeeCards';

function NetPayResultsEmployee(props) {
	const incomeTaxTables = props.incomeTaxTables;
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
		taxYearIndex,
		employmentType,
		taxableIncome,
		'nationalInsurance',
		annualBonus,
		prisa
	);
	const { month: healthInsurance, annual: annualHealthInsurance } = bituachLeumiCalc(
		taxYearIndex,
		employmentType,
		taxableIncome,
		'healthInsurance',
		annualBonus,
		prisa
	);
	const creditPointsTaxCredit = creditPoints * incomeTaxTables[taxYearIndex].creditPoint;
	const pensionLegalMin = pensionMinCalc(taxYearIndex, pensionableIncome, employmentType);
	const pensionContribution = pensionContributionCalc(
		pensionableIncome,
		pensionLegalMin,
		pensionOption,
		pensionAmount
	);
	const pensionTaxCredit = pensionReliefCalc(taxYearIndex, pensionContribution, pensionableIncome);
	const credits = creditPointsTaxCredit + pensionTaxCredit;
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxYearIndex,
		taxableIncome,
		annualBonus,
		credits,
		employmentType
	);
	const { monthlyBandPayments, annualBandPayments } = incomeTaxBandsCalc(
		taxYearIndex,
		annualIncomeTax,
		incomeTax
	);

	return (
		<>
			{showResultsTable && (
				<section>
					<h2 ref={props.scrollPoint}>Results</h2>
					{/* Cards */}
					{creditPoints <= 0 && noTaxCreditPoints()}
					{foodAllowance > 0 && foodAllowanceInfo(foodAllowance)}
					{/* End Cards */}
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
								<td>{formatCurrency('il', baseIncome, 2)}</td>
								<td>{formatCurrency('il', baseIncome * 12, 2)}</td>
							</tr>
							<tr>
								<td>Taxable Income</td>
								<td>{formatCurrency('il', taxableIncome, 2)}</td>
								<td>{formatCurrency('il', (taxableIncome - annualBonus) * 12 + annualBonus, 2)}</td>
							</tr>
							<TableBreakdown
								rowHeader={'Income Tax'}
								monthTotal={incomeTax}
								annualTotal={annualIncomeTax}
								monthBreakdown={monthlyBandPayments}
								annualBreakdown={annualBandPayments}
								decimal={2}
							/>
							<tr>
								<td>National Insurance</td>
								<td>{formatCurrency('il', nationalInsurance, 2)}</td>
								<td>{formatCurrency('il', annualNationalInsurance, 2)}</td>
							</tr>
							<tr>
								<td>Health Insurance</td>
								<td>{formatCurrency('il', healthInsurance, 2)}</td>
								<td>{formatCurrency('il', annualHealthInsurance, 2)}</td>
							</tr>
							<tr>
								<td>Pension</td>
								<td>{formatCurrency('il', pensionContribution, 2)}</td>
								<td>{formatCurrency('il', pensionContribution * 12, 2)}</td>
							</tr>
							{studyFundContribution > 0 && (
								<tr>
									<td>Study Fund</td>
									<td>{formatCurrency('il', studyFundContribution, 2)}</td>
									<td>{formatCurrency('il', studyFundContribution * 12, 2)}</td>
								</tr>
							)}
							{annualBonus > 0 && (
								<tr>
									<td>Bonus</td>
									<td>{formatCurrency('il', annualBonus, 2)}</td>
									<td>{formatCurrency('il', annualBonus, 2)}</td>
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
											studyFundContribution,
										2
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
											(pensionContribution + studyFundContribution) * 12,
										2
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

NetPayResultsEmployee.propTypes = {
	employmentType: globalProps.employmentType,
	scrollPoint: globalProps.scrollPoint,
	incomeTaxTables: taxProps.incomeTaxTables,
	stateData: globalProps.shape({
		taxYearIndex: taxProps.taxYearIndex,
		baseIncome: taxProps.baseIncome,
		creditPoints: taxProps.creditPoints,
		pensionOption: taxProps.pensionOption,
		pensionAmount: taxProps.pensionAmount,
		studyFundType: taxProps.studyFundType,
		studyFundAmount: taxProps.studyFundAmount,
		travelAllowance: taxProps.travelAllowance,
		foodAllowance: taxProps.foodAllowance,
		otherAllowance: taxProps.otherAllowance,
		overtime: taxProps.overtime,
		annualBonus: taxProps.annualBonus,
		commission: taxProps.commission,
		showResultsTable: globalProps.showResultsTable
	})
};

export default NetPayResultsEmployee;
