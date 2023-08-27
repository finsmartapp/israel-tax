import React from 'react';
import expensesData from '../../data/expenses.json';
import PageContainer from '../../components/page-container';
import Hero from '../../components/hero';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

function ExpensesTable() {
	const espenseTabel = expensesData.expenses;
	const currentVatIndex = expensesData.vat.length - 1;
	const vat = expensesData.vat[currentVatIndex].amount;

	return (
		<>
			<Hero h1='Recognised Expenses' heroImage='expenses' />
			<PageContainer>
				<section>
					<h2>What Is a Recognised Expense?</h2>
					<p>
						An expense that has a material benefit to your business, will be recognised by the tax
						authorities to allow you to deduct a percentage of it from your taxable income (profit).
						The deduction amount depends on the expense itself and the degree in which it benefits
						the business, and categorised as fully recognised, partially recognised or a capital
						expense.
					</p>
					<p>
						As tax is due on your income and not revenue, this allows you to lower your tax burden
						and the amount of tax you ultimately pay. For example, if your total revenue is{' '}
						{formatCurrency('il', 15000)} and you have a deductible amount of{' '}
						{formatCurrency('il', 2000)} in recognised expenses, you will only pay tax on your
						income of {formatCurrency('il', 13000)}. The amount of tax the this equates to will
						depend on your <Link to='/tax-rates/income-tax'>tax bracket</Link>. The saving will be
						greater the higher the bracket.
					</p>
					<p>
						If you're an osek murshe, a licensed dealer, the deduction is on the net amount
						(excludign VAT). In additon, the VAT can be offset against your VAT filings. If the
						amount of VAT you're elgibile to claim back is greater than the VAT you owe, you'll
						recieve a refund. The current rate of VAT is {vat}%. If you're osek patur, an exempt
						dealer, the deduction on the total amount.
					</p>
				</section>
				<section>
					<h2>Fully Recognised Expenses</h2>
					<p>
						A fully recognised expense is one made for the sole benefit of the business, such as
						office stationary, work travel or accounting. These expenses can be claimed in full.
					</p>
					<p>
						For example, if the total amount is {formatCurrency('il', 100 + vat)}, the net is{' '}
						{formatCurrency('il', 100)} and VAT portion is {formatCurrency('il', vat)}. As a fully
						recognised expense, an osek murshe can deduct {formatCurrency('il', 100)} from their tax
						liability and offset {formatCurrency('il', vat)} from their VAT returns. An osek patur
						can simply deduct {formatCurrency('il', 100 + vat)} from their tax liability.
					</p>
				</section>
				<section>
					<h2>Partially Recognised Expenses</h2>
					<p>
						A partially recognised expense is one that only partially applies to the business, such
						as a mobile phone that's used for both business and personal use. The deductible and VAT
						offset amounts vary depending on the expense and the level of business benefit.
					</p>
					<p>
						For example, if the total amount is {formatCurrency('il', 100 + vat)}, the net is{' '}
						{formatCurrency('il', 100)} and VAT portion is {formatCurrency('il', vat)}. If 25% is
						claimable, an osek murshe can deduct {formatCurrency('il', 100 / 4)} from their tax
						liability and offset {formatCurrency('il', vat / 4)} from their VAT returns. An osek
						patur can simply deduct {formatCurrency('il', (100 + vat) / 4)} from their tax
						liability.
					</p>
				</section>
				<section>
					<h2>Capital Expenses</h2>
					<p>
						A capital expense is the purchase or maintenance physical assets, such as equipment or
						furniture. As these assets usually last for a longer period of time, the deductible
						amount is spread over a specified amount of years. The time varies depending on the
						durability of the asset. The VAT is usually offset in full during the first year.
					</p>
					<p>
						For example, if the total amount is {formatCurrency('il', (100 + vat) * 10)}, the net is{' '}
						{formatCurrency('il', 100 * 10)} and VAT portion is {formatCurrency('il', vat * 10)}. If
						33% a year is claimable, an osek murshe can deduct{' '}
						{formatCurrency('il', (100 * 10) / 3)} a year from their tax liability and offset{' '}
						{formatCurrency('il', vat * 10)} from their VAT returns. An osek patur can simply deduct{' '}
						{formatCurrency('il', ((100 + vat) * 10) / 3)} a year from their tax liability.
					</p>
				</section>
				<section className='table-overflow'>
					<h2>Table of Common Expenses</h2>
					<Table striped bordered className='table--col-4'>
						<thead>
							<tr className='table__row-header table__row-header--primary'>
								<th>Expense</th>
								<th>Type</th>
								<th>Deduction</th>
								<th>VAT Offset</th>
							</tr>
						</thead>
						<tbody>
							{espenseTabel.map((expenseRow, i) => {
								const { expense, type, deduct, vat } = expenseRow;
								return (
									<tr key={i}>
										<td>{expense}</td>
										<td>{type}</td>
										<td>
											{deduct}% {type === 'Capital' && 'a year'}
										</td>
										<td>
											{vat}
											{typeof vat === 'number' && '%'}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</section>
			</PageContainer>
		</>
	);
}

export default ExpensesTable;
