import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import Table from 'react-bootstrap/table';
import { bituachLeumiCalc } from '../../../utils/tax-calculators/bituachLeumi';
import { nationalInsuranceSelfEmp } from '../../../utils/tax-calculators/nationalInsuranceSelfEmp';
import { pensionMinCalc } from '../../../utils/tax-calculators/pensionLegalMin';
import { pensionContributionCalc } from '../../../utils/tax-calculators/pensionContribution';
import { pensionReliefCalc } from '../../../utils/tax-calculators/pensionReliefSelfEmp';
import { studyFundCalc } from '../../../utils/tax-calculators/studyFund';
import { incomeTaxCalc } from '../../../utils/tax-calculators/incomeTax';
import { formatCurrency } from '../../../utils/formatCurrency';

function ResultsSelfEmployed(props) {
	const {
		taxData,
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
	const { studyFundContribution, studyFundTaxDeductible } = studyFundCalc(
		taxData,
		taxYearIndex,
		baseIncome,
		employmentType,
		studyFundAmount,
		studyFundType
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
	const bituachLeumiTaxDeductible = nationalInsuranceSelfEmp(taxData, taxYearIndex, taxableIncome);
	const { month: nationalInsurance, annual: annualNationalInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome - bituachLeumiTaxDeductible,
		false,
		0,
		'nationalInsurance'
	);
	const { month: healthInsurance, annual: annualHealthInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome - bituachLeumiTaxDeductible,
		false,
		0,
		'healthInsurance'
	);
	const creditPointsTaxCredit = creditPoints * taxData[taxYearIndex].creditPoint;
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		taxableIncome,
		0,
		creditPointsTaxCredit,
		pensionTaxCredit
	);

	return (
		<>
			{showResultsTable === true && (
				<section ref={props.resultsTable}>
					<h2>Net Pay Results</h2>
					<Table striped bordered className="table__3 table__header--blue">
						<thead>
							<tr>
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
								<td>Taxable income</td>
								<td>{formatCurrency('il', taxableIncome)}</td>
								<td>{formatCurrency('il', taxableIncome * 12)}</td>
							</tr>
							<tr>
								<td>Income tax</td>
								<td>{formatCurrency('il', incomeTax)}</td>
								<td>{formatCurrency('il', annualIncomeTax)}</td>
							</tr>
							<tr>
								<td>National insurance</td>
								<td>{formatCurrency('il', nationalInsurance)}</td>
								<td>{formatCurrency('il', annualNationalInsurance)}</td>
							</tr>
							<tr>
								<td>Health insurance</td>
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
									<td>Study fund</td>
									<td>{formatCurrency('il', studyFundContribution)}</td>
									<td>{formatCurrency('il', studyFundContribution * 12)}</td>
								</tr>
							)}

							<tr>
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
	resultsTable: payrollProps.resultsTable,
	stateData: globalProps.shape({
		taxData: payrollProps.taxData,
		taxYearIndex: payrollProps.taxYearIndex,
		baseIncome: payrollProps.baseIncome,
		creditPoints: payrollProps.creditPoints,
		pensionOption: payrollProps.pensionOption,
		pensionType: payrollProps.pensionType,
		pensionAmount: payrollProps.pensionAmount,
		studyFundType: payrollProps.studyFundType,
		studyFundAmount: payrollProps.studyFundAmount,
		showResultsTable: payrollProps.showResultsTable
	})
};

export default ResultsSelfEmployed;
