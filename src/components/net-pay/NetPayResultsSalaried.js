import React from 'react';
import { object, shape } from 'prop-types';
import { netPayType } from './PropTypes';
import { Table } from 'react-bootstrap';
import { bituachLeumiCalc } from './calculations/BituachLeumi';
import { pensionMinCalc } from './calculations/PensionLegalMin';
import { pensionContributionCalc } from './calculations/PensionContribution';
import { pensionReliefCalc } from './calculations/PensionReliefSalaried';
import { studyFundCalc } from './calculations/StudyFund';
import { incomeTaxCalc } from './calculations/IncomeTax';
import { formatCurrency } from '../../utils/FormatCurrency';

function NetPayResultsSalaried(props) {
	const {
		employmentType,
		taxData,
		taxYearIndex,
		baseIncome,
		creditPoints,
		pensionOption,
		pensionAmount,
		studyFundType,
		studyFundAmount,
		travelAllowance,
		lunchAllowance,
		overtime,
		annualBonus,
		commission,
		showResultsTable
	} = props.stateData;
	const studyFundContribution = studyFundCalc(
		taxData,
		taxYearIndex,
		baseIncome,
		employmentType,
		studyFundAmount,
		studyFundType
	);
	let taxableIncome = 0;
	[baseIncome, travelAllowance, lunchAllowance, annualBonus, overtime, commission].forEach(e => {
		taxableIncome += typeof e === 'number' && e;
	});
	const basicPlusIncentives = taxableIncome - travelAllowance - lunchAllowance;
	const prisa =
		annualBonus >
		(baseIncome + overtime + commission) *
			(taxData[taxYearIndex].bituachLeumi.prisaLimitPercent / 100);
	const { month: nationalInsurance, annual: annualNationalInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome,
		prisa,
		annualBonus,
		'nationalInsurance'
	);
	const { month: healthInsurance, annual: annualHealthInsurance } = bituachLeumiCalc(
		taxData,
		taxYearIndex,
		employmentType,
		taxableIncome,
		prisa,
		annualBonus,
		'healthInsurance'
	);
	const creditPointsTaxCredit = creditPoints * taxData[taxYearIndex].creditPointValue;
	const pensionLegalMin = pensionMinCalc(taxData, taxYearIndex, baseIncome, employmentType);
	const pensionContribution = pensionContributionCalc(
		baseIncome,
		pensionLegalMin,
		pensionOption,
		pensionAmount
	);
	const pensionTaxCredit = pensionReliefCalc(taxData, taxYearIndex, pensionContribution);
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		taxableIncome,
		annualBonus,
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
						<td>Basic salary</td>
						<td>{formatCurrency('il', baseIncome)}</td>
						<td>{formatCurrency('il', baseIncome * 12)}</td>
					</tr>
					<tr>
						<td>Taxable income</td>
						<td>{formatCurrency('il', taxableIncome)}</td>
						<td>{formatCurrency('il', (taxableIncome - annualBonus) * 12 + annualBonus)}</td>
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
							<td>Educational fund</td>
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
					<tr>
						<td>Net</td>
						<td>
							{formatCurrency(
								'il',
								basicPlusIncentives -
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
								(basicPlusIncentives - annualBonus) * 12 +
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
	);
}

NetPayResultsSalaried.propTypes = {
	refProp: object.isRequired,
	stateData: shape({
		employmentType: netPayType.employmentType,
		taxData: netPayType.taxData,
		taxYearIndex: netPayType.taxYearIndex,
		baseIncome: netPayType.baseIncome,
		creditPoints: netPayType.creditPoints,
		pensionOption: netPayType.pensionOption,
		pensionAmount: netPayType.pensionAmount,
		studyFundType: netPayType.studyFundType,
		studyFundAmount: netPayType.studyFundAmount,
		travelAllowance: netPayType.travelAllowance,
		lunchAllowance: netPayType.lunchAllowance,
		overtime: netPayType.overtime,
		annualBonus: netPayType.annualBonus,
		commission: netPayType.commission,
		showResultsTable: netPayType.showResultsTable
	})
};

export default NetPayResultsSalaried;
