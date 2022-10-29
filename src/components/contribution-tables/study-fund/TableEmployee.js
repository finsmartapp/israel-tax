import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import PayrollTaxYearBtn from '../../buttons/PayrollYear';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatCurrency';

function StudyFundTableEmployee(props) {
	const { taxData, taxYearIndex, employmentType, handleChange } = props;
	const {
		studyFund: {
			[employmentType]: { rate: aRate, ceiling: u2 },
			employer: { rate: bRate, ceiling: bCeiling }
		}
	} = taxData[taxYearIndex];

	return (
		<section>
			<h2>Contributions & Allowances</h2>
			<div className='section'>
				<p>
					A study fund allows you to save without paying capital gains tax on any profit the fund
					generates, up to a deposit ceiling.
				</p>
				<p>Key points:</p>
				<ul>
					<li>You can only open a study fund if your employer offers one</li>
					<li>
						You cannot withdraw from the fund for 6 years in order to benefit from the tax
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
			<Table striped bordered className='table--col-3'>
				<thead>
					<tr className='table__row-header table__row-header--primary'>
						<th></th>
						<th>Maximum Percent</th>
						<th>Annual Maximum</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Employee Contribution</td>
						<td>{aRate}</td>
						<td>{formatCurrency('il', u2 * (aRate / 100), 0)}</td>
					</tr>
					<tr>
						<td>Employer Contribution</td>
						<td>{bRate}</td>
						<td>{formatCurrency('il', bCeiling * (bRate / 100), 0)}</td>
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
	employmentType: globalProps.employmentType
};

export default StudyFundTableEmployee;
