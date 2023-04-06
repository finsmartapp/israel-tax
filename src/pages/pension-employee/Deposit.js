import React from 'react';
import { pensionProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';
import { currentYear } from '../../utils/globalVariables';

function EmployeePensionDeposit(props) {
	const { employee, employer, severance } = props.latestPensionData;
	const averageWage = props.averageWage;
	const employerMax = averageWage * (employer / 100);
	const severanceMax = averageWage * (employer / 100);

	return (
		<section>
			<h2>Contribution Rates</h2>
			<p>
				Both you and your employer must contribute to a pension by law. In addition to a pension
				contribution, your employer will also contribute an amount towards your severance pay.
			</p>
			<p>Key points:</p>
			<ul>
				<li>
					When you're eligible to receive your severance pay, you may choose to leave it in your
					pension fund
				</li>
				<li>
					Your employer will not include bonuses or overtime in the amount they pay contributions on
				</li>
				<li>
					Your employer is only required to contribute up to the equivalant amount of the national
					average wage, which is {formatCurrency('il', averageWage, 0)} a month for the{' '}
					{currentYear} tax year. However, you may be able to negotiate a higher limit in your
					contract
				</li>
				<li>
					Your individual circumstances at the start of your employment will dictate when your
					contributions start
				</li>
			</ul>
			<Table striped bordered className='table--col-3'>
				<thead>
					<tr className='table__row-header table__row-header--primary'>
						<th></th>
						<th>Percent</th>
						<th>Monthly Maximum</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Employee Pension Contribution</td>
						<td>{employee}</td>
						<td>No limit</td>
					</tr>
					<tr>
						<td>Employer Pension Contribution</td>
						<td>{employer}</td>
						<td>{formatCurrency('il', employerMax, 0)}</td>
					</tr>
					<tr>
						<td>Employer Severance Contribution</td>
						<td>{severance}</td>
						<td>{formatCurrency('il', severanceMax, 0)}</td>
					</tr>
					<tr className='table__total'>
						<td>Total</td>
						<td>{employee + employer + severance}</td>
						<td>{formatCurrency('il', employerMax + severanceMax, 0)}</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
}

EmployeePensionDeposit.propTypes = {
	latestPensionData: pensionProps.latestPensionData,
	averageWage: pensionProps.averageWage
};

export default EmployeePensionDeposit;
