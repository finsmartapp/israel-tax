import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import PayrollTaxYearBtn from '../../buttons/PayrollYear';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatCurrency';
import Cards from '../../card';

function StudyFundEmployee(props) {
	const { taxData, taxYearIndex, employmentType, handleChange } = props;
	const {
		studyFund: {
			[employmentType]: { rate: employeeRate, ceiling },
			employer: { rate: employerRate }
		}
	} = taxData[taxYearIndex];
	const maxEmployeeDeposit = ceiling * (employeeRate / 100);
	const maxEmployerDeposit = ceiling * (employerRate / 100);
	const exmpleAboveCeiling = ceiling * 1.25;
	const exmpleBelowCeiling = ceiling * 0.75;
	const exampleBelowMaxDepositEmployee = exmpleBelowCeiling * (employeeRate / 100);
	const exampleBelowMaxDepositEmployer = exmpleBelowCeiling * (employerRate / 100);

	return (
		<>
			<section>
				<h2>Contributions & Allowances</h2>
				<div className='section'>
					<p>
						A study fund allows you to save without paying capital gains tax on profit the fund
						generates, up to deposit limits and an income ceiling of{' '}
						{formatCurrency('il', ceiling, 0)} ({formatCurrency('il', ceiling / 12, 0)} a month).
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
			<section>
				<h2>Deposit Examples</h2>
				<Cards
					type='example'
					title='Salary Above the Income Ceiling'
					body={
						<>
							<p>
								If your annual income is {formatCurrency('il', exmpleAboveCeiling, 0)} (
								{formatCurrency('il', exmpleAboveCeiling / 12, 0)} a month), it exceeds the income
								ceiling and the following deposit amounts apply:
							</p>
							<ul>
								<li>
									{employeeRate}% of your income exceeds the deposit limit, so you can deposit the
									maximum of
									<ul>
										<li>{formatCurrency('il', maxEmployeeDeposit / 12, 0)} a month</li>
										<li>{formatCurrency('il', maxEmployeeDeposit, 0)} a year</li>
									</ul>
								</li>
								<li>
									{employerRate}% of your income exceeds the deposit limit, so your employer can
									deposit the maximum of
									<ul>
										<li>{formatCurrency('il', maxEmployerDeposit / 12, 0)} a month</li>
										<li>{formatCurrency('il', maxEmployerDeposit, 0)} a year</li>
									</ul>
								</li>
								<li>
									Any further deposits, whether made by you or your employer, won't be eligible for
									any tax benefits
								</li>
							</ul>
						</>
					}
				/>
				<Cards
					type='example'
					title='Salary Below the Income Ceiling'
					body={
						<>
							<p>
								If your annual income is {formatCurrency('il', exmpleBelowCeiling, 0)} (
								{formatCurrency('il', exmpleBelowCeiling / 12, 0)} a month), it's less than the
								income ceiling and the following deposits amounts apply:
							</p>
							<ul>
								<li>
									{employeeRate}% of your income
									<ul>
										<li>{formatCurrency('il', exampleBelowMaxDepositEmployee / 12, 0)} a month</li>
										<li>{formatCurrency('il', exampleBelowMaxDepositEmployee, 0)} a year</li>
									</ul>
								</li>
								<li>
									{employerRate}% from your employer
									<ul>
										<li>{formatCurrency('il', exampleBelowMaxDepositEmployer / 12, 0)} a month</li>
										<li>{formatCurrency('il', exampleBelowMaxDepositEmployer, 0)} a year</li>
									</ul>
								</li>
								<li>
									Any further deposits, whether made by you or your employer, won't be eligible for
									any tax benefits
								</li>
							</ul>
						</>
					}
				/>
			</section>
		</>
	);
}

StudyFundEmployee.propTypes = {
	handleChange: globalProps.handleChange,
	taxData: payrollProps.taxData,
	taxYearIndex: payrollProps.taxYearIndex,
	employmentType: globalProps.employmentType
};

export default StudyFundEmployee;
