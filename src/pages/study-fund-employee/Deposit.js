import React from 'react';
import { globalProps, studyProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function EmployeeStudyFundDeposit(props) {
	const { currentYear, employeeRate, employerRate, ceiling } = props;

	return (
		<section>
			<h2>Contributions & Allowances</h2>
			<p>
				A study fund allows you to save without paying capital gains tax on profit the fund
				generates, up to deposit limits and an income ceiling of {formatCurrency('il', ceiling, 0)}{' '}
				({formatCurrency('il', ceiling / 12, 0)} a month) for the {currentYear} tax year.
			</p>
			<p>Key points:</p>
			<ul>
				<li>You can only open a study fund if your employer offers one</li>
				<li>
					You cannot withdraw from the fund for 6 years in order to benefit from the tax exemptions,
					unless using the funds to pay for a study programme
				</li>
				<li>You don't pay income tax on your employer's contribution </li>
			</ul>
			<Table striped bordered className='table--col-3'>
				<thead>
					<tr className='table__row-header table__row-header--primary'>
						<th></th>
						<th>Maximum Percent</th>
						<th>Maximum Deposit</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Employee Contribution</td>
						<td>{employeeRate}</td>
						<td>{formatCurrency('il', ceiling * (employeeRate / 100), 0)}</td>
					</tr>
					<tr>
						<td>Employer Contribution</td>
						<td>{employerRate}</td>
						<td>{formatCurrency('il', ceiling * (employerRate / 100), 0)}</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
}

EmployeeStudyFundDeposit.propTypes = {
	currentYear: globalProps.currentYear,
	ceiling: studyProps.ceiling,
	employeeRate: studyProps.ceiling,
	employerRate: studyProps.ceiling
};

export default EmployeeStudyFundDeposit;
