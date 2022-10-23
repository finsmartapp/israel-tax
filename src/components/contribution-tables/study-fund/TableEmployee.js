import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import PayrollTaxYearBtn from '../../buttons/PayrollYear';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatCurrency';

function StudyFundTableEmployee(props) {
	const { taxData, taxYearIndex, employmentType, handleChange } = props;
	const {
		studyFund: {
			[employmentType]: { rate: u1, ceiling: u2 },
			employer: { rate: e1, ceiling: e2 }
		}
	} = taxData[taxYearIndex];

	return (
		<section>
			<div className='section'>
				<h2>Contributions & Allowances</h2>
				<p>
					A study fund allows you to save without paying capital gains tax on any profit the fund
					generates, up to a deposit ceiling.
				</p>
				<p>Key points:</p>
				<ul>
					<li>You can only open a study fund if your employer offers one</li>
					<li>
						You cannot withdraw from the fund for 6 years in order to beenfit from the tax
						exemptions, unless using the funds to pay for a study programme
					</li>
					<li>You don't pay income tax on your employer's contribution </li>
				</ul>
			</div>
			<PayrollTaxYearBtn
				value={taxYearIndex}
				columns={['xs=auto']}
				handleChange={handleChange}
				controlled={true}
			/>
			<Table striped bordered className='table--equal table__header--blue'>
				<thead>
					<tr>
						<th></th>
						<th>Maximum Percent</th>
						<th>Maximum Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Employee Contribution</td>
						<td>{u1}</td>
						<td>{formatCurrency('il', u2 * (u1 / 100), 0)}</td>
					</tr>
					<tr>
						<td>Employer Contribution</td>
						<td>{e1}</td>
						<td>{formatCurrency('il', e2 * (e1 / 100), 0)}</td>
					</tr>
				</tbody>
			</Table>
		</section>
	);
}

StudyFundTableEmployee.propTypes = {
	handleChange: globalProps.handleChange,
	taxData: payrollProps.taxData,
	taxYearIndex: payrollProps.taxYearIndex,
	employmentType: payrollProps.employmentType
};

export default StudyFundTableEmployee;
