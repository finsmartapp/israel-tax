import React from 'react';
import { object, shape } from 'prop-types';
import { netPayType } from './PropTypes';
import { Table } from 'react-bootstrap';
import { bituachLeumiCalc } from '../../../utils/tax-calculators/bituachLeumi';
import { pensionMinCalc } from '../../../utils/tax-calculators/pensionLegalMin';
import { pensionContributionCalc } from '../../../utils/tax-calculators/pensionContribution';
import { pensionReliefCalc } from '../../../utils/tax-calculators/pensionReliefSalaried';
import { studyFundCalc } from '../../../utils/tax-calculators/studyFund';
import { incomeTaxCalc } from '../../../utils/tax-calculators/incomeTax';
import { formatCurrency } from '../../../utils/formatCurrency';
import { cardAllowancePopup } from './Popups';

function ResultsSalaried(props) {
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
		otherAllowance,
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
	[
		baseIncome,
		travelAllowance,
		lunchAllowance,
		otherAllowance,
		annualBonus,
		commission,
		overtime
	].forEach(e => {
		taxableIncome += typeof e === 'number' && e;
	});
	const pensionableIncome = taxableIncome - travelAllowance - annualBonus - overtime;
	const paycheckGross = taxableIncome - lunchAllowance;
	const prisa =
		annualBonus >
		(taxableIncome - annualBonus) * (taxData[taxYearIndex].bituachLeumi.prisaLimitPercent / 100);
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
	const { incomeTax, annualIncomeTax } = incomeTaxCalc(
		taxData,
		taxYearIndex,
		taxableIncome,
		annualBonus,
		creditPointsTaxCredit,
		pensionTaxCredit
	);

	return (
		<>
			{showResultsTable === true && (
				<section ref={props.refProp}>
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
			<>{lunchAllowance > 0 && showResultsTable === true && cardAllowancePopup(lunchAllowance)}</>
		</>
	);
}

ResultsSalaried.propTypes = {
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
		otherAllowance: netPayType.otherAllowance,
		overtime: netPayType.overtime,
		annualBonus: netPayType.annualBonus,
		commission: netPayType.commission,
		showResultsTable: netPayType.showResultsTable
	})
};

export default ResultsSalaried;
