import React from 'react';
import { pensionProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function SelfEmployedPensionTaxRelief(props) {
	const {
		taxDeductableLimit,
		taxCreditLimit,
		eligibleIncome,
		ceiling,
		maxContribution,
		beneficiaryPayment,
		recognisedExpense,
		taxCredit
	} = props;

	return (
		<section>
			<h2>Tax Relief</h2>
			<p>
				You're entitled to tax relief on pension contributions up to{' '}
				{taxDeductableLimit + taxCreditLimit}% of your annual income, with {taxDeductableLimit}%
				being a recognised expense and up to {taxCreditLimit}% receiving a tax credit of 35%, up to
				deposit ceilings and type of pension.
			</p>
			<p>
				Up to an eligible income of {formatCurrency('il', eligibleIncome, 0)}, the full benefits are
				available as a simple percentage of your income. If your income exceeds this, the benefits
				are calculated in two tiers and you must be defined as a beneficiary to be eligible for the
				second tier. To become a beneficiary, a beneficiary payment must be deposited, which is in
				addition to the amounts deposited in the first tier and on which no tax benefits are
				available.
			</p>
			<p>
				Tax relief is only available up to an income ceiling of {formatCurrency('il', ceiling, 0)},
				with the tier ceilings being divided equally.
			</p>
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
						<td>Beneficary Payment</td>
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

SelfEmployedPensionTaxRelief.propTypes = {
	taxDeductableLimit: pensionProps.taxDeductableLimit,
	taxCreditLimit: pensionProps.taxCreditLimit,
	eligibleIncome: pensionProps.eligibleIncome,
	ceiling: pensionProps.ceiling,
	maxContribution: pensionProps.maxContribution,
	beneficiaryPayment: pensionProps.beneficiaryPayment,
	recognisedExpense: pensionProps.recognisedExpense,
	taxCredit: pensionProps.taxCredit
};

export default SelfEmployedPensionTaxRelief;
