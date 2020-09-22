import React from 'react';
import { object, shape } from 'prop-types';
import { netPayType } from './PropTypes';
import Table from 'react-bootstrap/table';
import { bituachLeumiCalc } from './calculations/BituachLeumi';
import { nationalInsuranceSelfEmp } from './calculations/NationalInsuranceSelfEmp';
import { pensionMinCalc } from './calculations/PensionLegalMin';
import { pensionContributionCalc } from './calculations/PensionContribution';
import { pensionBenefitCalc } from './calculations/PensionBenefitSelfEmp';
import { educationFundCalc } from './calculations/EducationFund';
import { incomeTaxCalc } from './calculations/IncomeTax';
import { formatCurrency } from '../../utils/FormatCurrency';

function NetPayResultsSelfEmployed(props) {
	const {
		employmentType,
		taxData,
		taxYearIndex,
		baseIncome,
		creditPoints,
		pensionOption,
		pensionType,
		pensionAmount,
		educationFund,
		showResultsTable
	} = props.stateData;
	const { educationFundContribution, educationFundTaxDeductible } = educationFundCalc(
		taxData,
		taxYearIndex,
		baseIncome,
		employmentType,
		educationFund
	);
	const pensionLegalMin = pensionMinCalc(taxData, taxYearIndex, baseIncome, employmentType);
	const pensionContribution = pensionContributionCalc(
		baseIncome,
		pensionLegalMin,
		pensionOption,
		pensionAmount,
		pensionType
	);
	const { pensionTaxDeductible, pensionTaxCredit } = pensionBenefitCalc(
		taxData,
		taxYearIndex,
		baseIncome,
		pensionContribution
	);
	const taxableIncome = baseIncome - educationFundTaxDeductible - pensionTaxDeductible;
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
	const creditPointsTaxCredit = creditPoints * taxData[taxYearIndex].creditPointValue;
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		taxableIncome,
		0,
		creditPointsTaxCredit,
		pensionTaxCredit
	);

	return (
		<section
			style={{
				display: showResultsTable === true ? 'block' : 'none'
			}}
			ref={props.refProp}
		>
			<h2>Net pay results</h2>
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
					{educationFundContribution > 0 && (
						<tr>
							<td>Educational fund</td>
							<td>{formatCurrency('il', educationFundContribution)}</td>
							<td>{formatCurrency('il', educationFundContribution * 12)}</td>
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
									educationFundContribution
							)}
						</td>
						<td>
							{formatCurrency(
								'il',
								baseIncome * 12 +
									annualIncomeTax -
									annualNationalInsurance -
									annualHealthInsurance -
									pensionContribution * 12 -
									educationFundContribution * 12
							)}
						</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
}

NetPayResultsSelfEmployed.propTypes = {
	refProp: object.isRequired,
	stateData: shape({
		employmentType: netPayType.employmentType,
		taxData: netPayType.taxData,
		taxYearIndex: netPayType.taxYearIndex,
		baseIncome: netPayType.baseIncome,
		creditPoints: netPayType.creditPoints,
		pensionOption: netPayType.pensionOption,
		pensionType: netPayType.pensionType,
		pensionAmount: netPayType.pensionAmount,
		educationFund: netPayType.educationFund,
		showResultsTable: netPayType.showResultsTable
	})
};

export default NetPayResultsSelfEmployed;
