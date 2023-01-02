import React from 'react';
import { payrollProps } from '../../../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../../utils/formatCurrency';
import Cards from '../../../card';

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
	//Examples
	const eligibleDeductable = eligibleIncome * (taxDeductableLimit / 100);
	const eligibleCredit = eligibleIncome * (taxCreditLimit / 100);
	const taxCreditContribution = tierLimit * (taxCreditLimit / 100);

	return (
		<>
			<section>
				<h2>Tax Relief Benefits</h2>
				<div className='section'>
					<p>
						You're entitled to tax relief on pension contributions up to{' '}
						{taxDeductableLimit + taxCreditLimit}% of your annual income, with {taxDeductableLimit}%
						being a recognised expense and up to {taxCreditLimit}% receiving a tax credit of 35%, up
						to deposit ceilings and type of pension.
					</p>
					<p>
						Up to an eligible income of {formatCurrency('il', eligibleIncome, 0)}, the full benefits
						are available as a simple percentage of your income. If your income exceeds this, the
						benefits are calculated in two tiers and you must be defined as a beneficiary to be
						eligible for the second tier. To become a beneficiary, a beneficiary payment must be
						deposited, which is in addition to the amounts deposited in the first tier and on which
						no tax benefits are available.
					</p>
					<p>
						Tax relief is only available up to an income ceiling of{' '}
						{formatCurrency('il', ceiling, 0)}, with the tier ceilings being divided equally.
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
			<section>
				<h2>Tax Relief Examples</h2>
				<Cards
					type='example'
					title='Eligible Income Salary'
					body={
						<>
							<p>
								If your annual income is {formatCurrency('il', eligibleIncome, 0)}, you can make the
								following deposits:
							</p>
							<ul>
								<li>
									{taxDeductableLimit}% of your income,{' '}
									{formatCurrency('il', eligibleDeductable, 0)}, will be considered a recognised
									expense
								</li>
								<li>
									An additional {taxCreditLimit}% of your income,{' '}
									{formatCurrency('il', eligibleCredit, 0)}, will receive a tax credit of{' '}
									{taxCreditRate}%, equalling{' '}
									{formatCurrency('il', eligibleDeductable * (taxCreditLimit / 100), 0)}
								</li>
								<li>
									Total deposit amount of{' '}
									{formatCurrency('il', eligibleDeductable + eligibleCredit, 0)}. Any further
									deposits won't be eligible for any tax benefits
								</li>
							</ul>
						</>
					}
				/>
				<Cards
					type='example'
					title='Salary Above the Income Ceiling'
					body={
						<>
							<p>
								If your annual income is {formatCurrency('il', ceiling * 1.25, 0)}, it exceeds the
								eligible income limit and your contributions are subject to the tired system.
							</p>
							<p>
								The tier one ceiling is fixed at {formatCurrency('il', tierLimit, 0)}. The initial
								deposits that can be made are:
							</p>
							<ul>
								<li>
									{taxDeductableLimit}% of tier one, {formatCurrency('il', recognisedExpense, 0)},
									will be considered a recognised expense
								</li>
								<li>
									An additional {taxCreditLimit}%, {formatCurrency('il', taxCreditContribution, 0)},
									will receive a tax credit of {taxCreditRate}%, equalling{' '}
									{formatCurrency('il', taxCredit, 0)}
								</li>
							</ul>
							<p>
								The tier two ceiling is fixed at {formatCurrency('il', tierLimit, 0)}. The tax
								benefits of this tier are only available once you deposit an additional{' '}
								{formatCurrency('il', beneficiaryPayment, 0)} to gain beneficary status. No tax
								benefits are available on this amount, but you will receive them on the following:
							</p>
							<ul>
								<li>
									{taxDeductableLimit}% of tier two, {formatCurrency('il', recognisedExpense, 0)},
									will be considered a recognised expense
								</li>
								<li>
									An additional {taxCreditLimit}%, {formatCurrency('il', taxCreditContribution, 0)},
									will receive a tax credit of {taxCreditRate}%, equalling{' '}
									{formatCurrency('il', taxCredit, 0)}
								</li>
							</ul>
							<p>
								The total amount you need to deposit to gain the full tax benefits is{' '}
								{formatCurrency('il', maxContribution * 2 + beneficiaryPayment, 0)}.{' '}
								{formatCurrency('il', maxContribution, 0)} in tier one, plus the{' '}
								{formatCurrency('il', beneficiaryPayment, 0)} beneficiary payment, plus{' '}
								{formatCurrency('il', maxContribution, 0)} in tier two.
							</p>
						</>
					}
				/>
			</section>
		</>
	);
}

SelfEmployedPensionExpense.propTypes = {
	taxYearIndex: payrollProps.taxYearIndex,
	taxData: payrollProps.taxData
};

export default SelfEmployedPensionExpense;
