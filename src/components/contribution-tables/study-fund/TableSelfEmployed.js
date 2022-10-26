import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import PayrollTaxYearBtn from '../../buttons/PayrollYear';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatCurrency';

function StudyFundTableSelfEmployed(props) {
	const { taxData, taxYearIndex, employmentType, handleChange } = props;
	const { rate, ceiling, capitalGainsLimit } = taxData[taxYearIndex].studyFund[employmentType];

	return (
		<section>
			<h2>Contributions & Allowances</h2>
			<div className='section'>
				<p>
					A study fund allows you to save without paying capital gains tax on any profit the fund
					generates and the contrbutions are a recognised expense, up to deposit ceilings. You
					cannot withdraw from the fund for 6 years in order to benefit from the capital gains
					exemption, unless using the funds to pay for a study programme.
				</p>
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
						<td>Recognised Expense</td>
						<td>{rate}</td>
						<td>{formatCurrency('il', ceiling * (rate / 100), 0)}</td>
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

StudyFundTableSelfEmployed.propTypes = {
	handleChange: globalProps.handleChange,
	taxData: payrollProps.taxData,
	taxYearIndex: payrollProps.taxYearIndex,
	employmentType: payrollProps.employmentType
};

export default StudyFundTableSelfEmployed;
