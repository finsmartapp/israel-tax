import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import Table from 'react-bootstrap/table';
import { bituachLeumiCalc } from '../../../utils/tax-calculators/bituachLeumi';
import { nationalInsuranceSelfEmp } from '../../../utils/tax-calculators/nationalInsuranceSelfEmp';
import { pensionMinCalc } from '../../../utils/tax-calculators/pensionLegalMin';
import { pensionContributionCalc } from '../../../utils/tax-calculators/pensionContribution';
import { pensionReliefCalc } from '../../../utils/tax-calculators/pensionReliefSelfEmp';
import { studyFundAllowances } from '../../../utils/tax-calculators/studyFundAllowances';
import { studyFundCalc } from '../../../utils/tax-calculators/studyFund';
import { incomeTaxCalc } from '../../../utils/tax-calculators/incomeTax';
import { incomeTaxBandsCalc } from '../../../utils/tax-calculators/incomeTaxBands';
import { formatCurrency } from '../../../utils/formatCurrency';
import IncomeTaxTable from '../breakdown/income-tax';

function ResultsSelfEmployed(props) {
	const taxData = props.taxData;
	const {
		taxYearIndex,
		baseIncome,
		creditPoints,
		pensionOption,
		pensionType,
		pensionAmount,
		studyFundType,
		studyFundAmount,
		showResultsTable
	} = props.stateData;
	const employmentType = props.employmentType;
	const studyFundTaxAllowance = studyFundAllowances(
		taxData,
		taxYearIndex,
		baseIncome,
		employmentType
	);
	const { studyFundContribution, studyFundTaxDeductible } = studyFundCalc(
		baseIncome,
		employmentType,
		studyFundAmount,
		studyFundType,
		studyFundTaxAllowance
	);
	const pensionLegalMin = pensionMinCalc(taxData, taxYearIndex, baseIncome, employmentType);
	const pensionContribution = pensionContributionCalc(
		baseIncome,
		pensionLegalMin,
		pensionOption,
		pensionAmount,
		pensionType
	);
	const { pensionTaxDeductible, pensionTaxCredit } = pensionReliefCalc(
		taxData,
		taxYearIndex,
		baseIncome,
		pensionContribution
	);
	const taxableIncome = baseIncome - studyFundTaxDeductible - pensionTaxDeductible;
	const bituachLeumiDeductible = nationalInsuranceSelfEmp(taxData, taxYearIndex, taxableIncome);
	const { month: nationalInsurance, annual: annualNationalInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome - bituachLeumiDeductible,
		'nationalInsurance'
	);
	const { month: healthInsurance, annual: annualHealthInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome - bituachLeumiDeductible,
		'healthInsurance'
	);
	const creditPointsTaxCredit = creditPoints * taxData[taxYearIndex].creditPoint;
	const incomeTaxTaxableIncome =
		taxableIncome -
		nationalInsurance *
			(taxData[taxYearIndex].bituachLeumi.selfEmployedNationalInsuranceDiscount / 100);
	const credits = creditPointsTaxCredit + pensionTaxCredit;
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		incomeTaxTaxableIncome,
		0,
		credits,
		employmentType
	);
	const { monthlyBandPayments, annualBandPayments } = incomeTaxBandsCalc(
		taxData,
		taxYearIndex,
		annualIncomeTax
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
								<td>Profit</td>
								<td>{formatCurrency('il', baseIncome)}</td>
								<td>{formatCurrency('il', baseIncome * 12)}</td>
							</tr>
							<tr>
								<td>Taxable Income</td>
								<td>{formatCurrency('il', incomeTaxTaxableIncome)}</td>
								<td>{formatCurrency('il', incomeTaxTaxableIncome * 12)}</td>
							</tr>
							<IncomeTaxTable
								incomeTax={incomeTax}
								annualIncomeTax={annualIncomeTax}
								monthlyBandPayments={monthlyBandPayments}
								annualBandPayments={annualBandPayments}
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
							<tr className='table_total'>
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

ResultsSelfEmployed.propTypes = {
	employmentType: globalProps.employmentType,
	resultsTable: globalProps.resultsTable,
	taxData: payrollProps.taxData,
	stateData: globalProps.shape({
		taxYearIndex: payrollProps.taxYearIndex,
		baseIncome: payrollProps.baseIncome,
		creditPoints: payrollProps.creditPoints,
		pensionOption: payrollProps.pensionOption,
		pensionType: payrollProps.pensionType,
		pensionAmount: payrollProps.pensionAmount,
		studyFundType: payrollProps.studyFundType,
		studyFundAmount: payrollProps.studyFundAmount,
		showResultsTable: globalProps.showResultsTable
	})
};

export default ResultsSelfEmployed;
