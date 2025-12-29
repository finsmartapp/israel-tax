import React from 'react';
import { globalProps, taxProps } from '../../prop-types';
import Table from 'react-bootstrap/table';
import {
	bituachLeumiCalc,
	niDeductibleSelfEmpCalc,
	pensionMinCalc,
	pensionContributionCalc,
	pensionReliefCalcSelfEmp,
	studyFundAllowances,
	studyFundCalc,
	incomeTaxCalc,
	incomeTaxBandsCalc,
	niDeductibleAdvanceSelfEmpCalc
} from '../../utils/tax-calculators';
import { formatCurrency } from '../../utils/formatCurrency';
import TableBreakdown from '../../components/table-breakdown';
//Cards
import { noTaxCreditPoints } from './info-cards/EmployeeCards';
import { noBituachLeumiAdvances } from './info-cards/SelfEmpCards';

function NetPayResultsSelfEmployed(props) {
	const incomeTaxTables = props.incomeTaxTables;
	const {
		taxYearIndex,
		baseIncome,
		creditPoints,
		bituachLeumiAdvance,
		pensionOption,
		pensionType,
		pensionAmount,
		studyFundType,
		studyFundAmount,
		showResultsTable
	} = props.stateData;
	const employmentType = props.employmentType;
	const studyFundTaxAllowance = studyFundAllowances(taxYearIndex, baseIncome, employmentType);
	const { studyFundContribution, studyFundTaxDeductible } = studyFundCalc(
		baseIncome,
		employmentType,
		studyFundAmount,
		studyFundType,
		studyFundTaxAllowance
	);
	const pensionLegalMin = pensionMinCalc(taxYearIndex, baseIncome, employmentType);
	const pensionContribution = pensionContributionCalc(
		baseIncome,
		pensionLegalMin,
		pensionOption,
		pensionAmount,
		pensionType
	);
	const { pensionTaxDeductible, pensionTaxCredit } = pensionReliefCalcSelfEmp(
		taxYearIndex,
		baseIncome,
		pensionContribution
	);
	const taxableIncome = baseIncome - studyFundTaxDeductible - pensionTaxDeductible;
	const bituachLeumiDeductible = niDeductibleSelfEmpCalc(taxYearIndex, taxableIncome);
	const { month: nationalInsurance, annual: annualNationalInsurance } = bituachLeumiCalc(
		taxYearIndex,
		employmentType,
		taxableIncome - bituachLeumiDeductible,
		'nationalInsurance'
	);
	const { month: healthInsurance, annual: annualHealthInsurance } = bituachLeumiCalc(
		taxYearIndex,
		employmentType,
		taxableIncome - bituachLeumiDeductible,
		'healthInsurance'
	);
	const creditPointsTaxCredit = creditPoints * incomeTaxTables[taxYearIndex].creditPoint;
	const niIncomeTaxDeductible = niDeductibleAdvanceSelfEmpCalc(taxYearIndex, bituachLeumiAdvance);
	const incomeTaxTaxableIncome = taxableIncome - niIncomeTaxDeductible;
	const credits = creditPointsTaxCredit + pensionTaxCredit;
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxYearIndex,
		incomeTaxTaxableIncome,
		0,
		credits,
		employmentType
	);
	const { monthlyBandPayments, annualBandPayments } = incomeTaxBandsCalc(
		taxYearIndex,
		annualIncomeTax
	);

	return (
		<>
			{showResultsTable && (
				<section>
					<h2 ref={props.scrollPoint}>Results</h2>
					{/* Cards */}
					{creditPoints <= 0 && noTaxCreditPoints()}
					{bituachLeumiAdvance <= 0 && noBituachLeumiAdvances()}
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
								<td>Profit</td>
								<td>{formatCurrency('il', baseIncome)}</td>
								<td>{formatCurrency('il', baseIncome * 12)}</td>
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
							<tr className='table__total'>
								<td>Net</td>
								<td>
									{formatCurrency(
										'il',
										baseIncome -
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
										baseIncome * 12 -
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
		</>
	);
}

NetPayResultsSelfEmployed.propTypes = {
	employmentType: globalProps.employmentType,
	scrollPoint: globalProps.scrollPoint,
	incomeTaxTables: taxProps.incomeTaxTables,
	stateData: globalProps.shape({
		taxYearIndex: taxProps.taxYearIndex,
		baseIncome: taxProps.baseIncome,
		creditPoints: taxProps.creditPoints,
		pensionOption: taxProps.pensionOption,
		pensionType: taxProps.pensionType,
		pensionAmount: taxProps.pensionAmount,
		studyFundType: taxProps.studyFundType,
		studyFundAmount: taxProps.studyFundAmount,
		showResultsTable: globalProps.showResultsTable,
		bituachLeumiAdvance: taxProps.bituachLeumiAdvance
	})
};

export default NetPayResultsSelfEmployed;
