import React from 'react';
import { payrollProps } from '../../../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../../utils/formatCurrency';

function SelfEmployedPensionExpense(props) {
	const { taxYearIndex, taxData } = props;

	const { taxDeductableLimit, taxCreditLimit, taxCreditRate, eligibleIncome, ceiling } =
		taxData[taxYearIndex].pension.taxRelief.selfEmployed;
	const deductableDecimal = taxDeductableLimit / 100;
	const creditDecimal = taxCreditLimit / 100;
	const tierLimit = ceiling / 2;
	const maxContribution = tierLimit * (deductableDecimal + creditDecimal);
	const beneficiaryPayment =
		taxData[taxYearIndex].bituachLeumi.averageSalary * 0.16 * 12 - maxContribution;
	const recognisedExpense = tierLimit * (taxDeductableLimit / 100);
	const taxCredit = tierLimit * (taxCreditLimit / 100) * (taxCreditRate / 100);

	return (
		<section>
			<h2>Tax Relief Benefits</h2>
			<div className='section'>
				<p>
					You're entitled to tax releif on pension contributions up to{' '}
					{taxDeductableLimit + taxCreditLimit}% of your annual income, with {taxDeductableLimit}%
					being a recognised expense and up to {taxCreditLimit}% receiving a tax credit of 35%, up
					to deposit ceilings.
				</p>
				<p>
					Up to an eligible income of {formatCurrency('il', eligibleIncome, 0)}, the full benefits
					are available as a simple percentage of your income. If your income exceeds this, the
					benefits are calculated in two tiers and you must be defined as a beneficary to be
					eligiible for the second teir. To become a beneficiary, a beneficary payment must be
					deposited, which is in addition to the amounts deposited in the first tier and on which no
					tax benefits are availble.
				</p>
				<p>
					Tax relief is only available up to an income cieling of {formatCurrency('il', ceiling, 0)}
					, with the teir cleilings being divided equally.
				</p>
			</div>
			<Table striped bordered className='table--col-4'>
				<thead>
					<tr className='table__row-header table__row-header--primary'>
						<th></th>
						<th>Maximum Contribution</th>
						<th>Recognised Expense</th>
						<th>Tax Credit</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Tier One </td>
						<td>{formatCurrency('il', maxContribution, 0)}</td>
						<td>{formatCurrency('il', recognisedExpense, 0)}</td>
						<td>{formatCurrency('il', taxCredit, 0)}</td>
					</tr>
					<tr>
						<td>Beneficary payment</td>
						<td>{formatCurrency('il', beneficiaryPayment, 0)}</td>
						<td>{formatCurrency('il', 0, 0)}</td>
						<td>{formatCurrency('il', 0, 0)}</td>
					</tr>
					<tr>
						<td>Tier Two </td>
						<td>{formatCurrency('il', maxContribution, 0)}</td>
						<td>{formatCurrency('il', recognisedExpense, 0)}</td>
						<td>{formatCurrency('il', taxCredit, 0)}</td>
					</tr>
					<tr className='table__total'>
						<td>Total</td>
						<td>{formatCurrency('il', maxContribution * 2 + beneficiaryPayment, 0)}</td>
						<td>{formatCurrency('il', recognisedExpense * 2, 0)}</td>
						<td>{formatCurrency('il', taxCredit * 2, 0)}</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
}

SelfEmployedPensionExpense.propTypes = {
	taxYearIndex: payrollProps.taxYearIndex,
	taxData: payrollProps.taxData
};

export default SelfEmployedPensionExpense;
