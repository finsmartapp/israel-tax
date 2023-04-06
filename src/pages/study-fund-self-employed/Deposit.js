import React from 'react';
import { globalProps, studyProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function SelfEmployedStudyFundDeposit(props) {
	const { ceiling, currentYear, rate, capitalGainsLimit, maxDeposit } = props;

	return (
		<section>
			<h2>Contributions & Allowances</h2>
			<p>
				A study fund allows you to save without paying capital gains tax on profit the fund
				generates and the contributions are a recognised expense, up to deposit limits and an income
				of ceiling of {formatCurrency('il', ceiling, 0)} for the {currentYear} tax year. You cannot
				withdraw from the fund for 6 years in order to benefit from the capital gains exemption,
				unless using the funds to pay for a study/training programme.
			</p>
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
						<td>Recognised Expense</td>
						<td>{rate}</td>
						<td>{formatCurrency('il', maxDeposit, 0)}</td>
					</tr>
					<tr>
						<td>Capital Gains Exemption</td>
						<td></td>
						<td>{formatCurrency('il', capitalGainsLimit, 0)}</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
}

SelfEmployedStudyFundDeposit.propTypes = {
	currentYear: globalProps.currentYear,
	ceiling: studyProps.ceiling,
	rate: studyProps.rate,
	capitalGainsLimit: studyProps.capitalGainsLimit,
	maxDeposit: studyProps.maxDeposit
};

export default SelfEmployedStudyFundDeposit;
