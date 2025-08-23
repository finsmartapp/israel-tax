import React from 'react';
import { pensionProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function SelfEmployedPensionTaxRelief(props) {
	const {
		taxDeductibleMaxPercent,
		taxCreditMaxPercent,
		eligibleIncome,
		ceiling,
		maxContribution,
		beneficiaryPayment,
		recognisedExpense,
		taxCredit
	} = props;

	return (
		<section>
			<h2 id='tax-relief'>Tax Relief</h2>
			<p>
				You're entitled to tax relief on pension contributions up to{' '}
				{taxDeductibleMaxPercent + taxCreditMaxPercent}% of your annual income, with{' '}
				{taxDeductibleMaxPercent}% being a recognised expense and up to {taxCreditMaxPercent}%
				receiving a tax credit of 35%, up to deposit ceilings and type of pension.
			</p>
			<p>
				Up to an eligible income of {formatCurrency('il', eligibleIncome)}, the full benefits are
				available as a simple percentage of your income. If your income exceeds this, the benefits
				are calculated in two tiers and you must be defined as a beneficiary to be eligible for the
				second tier. To become a beneficiary, a beneficiary payment must be deposited; it is in
				addition to the first-tier amounts and is not deductible, but it may count toward the
				tax-credit base (it does not raise the caps).
			</p>
			<p>
				Tax relief is only available up to an income ceiling of {formatCurrency('il', ceiling)},
				with the tier ceilings being divided equally.
			</p>
			<div className='table-overflow'>
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
							<td>{formatCurrency('il', maxContribution)}</td>
							<td>{formatCurrency('il', recognisedExpense)}</td>
							<td>{formatCurrency('il', taxCredit)}</td>
						</tr>
						<tr>
							<td>Beneficary Payment</td>
							<td>{formatCurrency('il', beneficiaryPayment)}</td>
							<td>{formatCurrency('il', 0)}</td>
							<td></td>
						</tr>
						<tr>
							<td>Tier Two </td>
							<td>{formatCurrency('il', maxContribution)}</td>
							<td>{formatCurrency('il', recognisedExpense)}</td>
							<td>{formatCurrency('il', taxCredit)}</td>
						</tr>
						<tr className='table__total'>
							<td>Total</td>
							<td>{formatCurrency('il', maxContribution * 2 + beneficiaryPayment)}</td>
							<td>{formatCurrency('il', recognisedExpense * 2)}</td>
							<td>{formatCurrency('il', taxCredit * 2)}</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</section>
	);
}

SelfEmployedPensionTaxRelief.propTypes = {
	taxDeductibleMaxPercent: pensionProps.taxDeductibleMaxPercent,
	taxCreditMaxPercent: pensionProps.taxCreditMaxPercent,
	eligibleIncome: pensionProps.eligibleIncome,
	ceiling: pensionProps.ceiling,
	maxContribution: pensionProps.maxContribution,
	beneficiaryPayment: pensionProps.beneficiaryPayment,
	recognisedExpense: pensionProps.recognisedExpense,
	taxCredit: pensionProps.taxCredit
};

export default SelfEmployedPensionTaxRelief;
