import React from 'react';
import { pensionProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';
import { currentYear } from '../../utils/globalVariables';

function SelfEmployedPensionDeposit(props) {
	const { averageWage, reducedRate, fullRate, reducedMax, fullMax } = props;

	return (
		<section>
			<h2>Contribution Rates</h2>
			<p>
				You're required to contribute to a pension by law. The minimum contribution amounts are
				calculated in relation to your taxable income and the national average wage, up to a maximum
				required amount.
			</p>
			<p>
				The national avergae wage for the {currentYear} tax year is{' '}
				{formatCurrency('il', averageWage)} a month.
			</p>
			<Table striped bordered className='table--col-3 table__header--blue'>
				<thead>
					<tr className='table__row-header table__row-header--primary'>
						<th>National Average</th>
						<th>Percent</th>
						<th>Annual Maximum</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Up to 50%</td>
						<td>{reducedRate}</td>
						<td>{formatCurrency('il', reducedMax * 12)}</td>
					</tr>
					<tr>
						<td>Over 50%</td>
						<td>{fullRate}</td>
						<td>{formatCurrency('il', fullMax * 12)}</td>
					</tr>
					<tr className='table__total'>
						<td>Total</td>
						<td></td>
						<td>{formatCurrency('il', (reducedMax + fullMax) * 12)}</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
}

SelfEmployedPensionDeposit.propTypes = {
	averageWage: pensionProps.averageWage,
	reducedRate: pensionProps.reducedRate,
	fullRate: pensionProps.fullRate,
	reducedMax: pensionProps.reducedMax,
	fullMax: pensionProps.fullMax
};

export default SelfEmployedPensionDeposit;
