import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import PayrollTaxYearBtn from '../../buttons/PayrollYear';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatCurrency';
import Cards from '../../card';

function StudyFundSelfEmployed(props) {
	const { taxData, taxYearIndex, employmentType, handleChange } = props;
	const { rate, ceiling, capitalGainsLimit } = taxData[taxYearIndex].studyFund[employmentType];
	const maxDeposit = ceiling * (rate / 100);
	const exmpleAboveCeiling = ceiling * 1.25;
	const exmpleBelowCeiling = ceiling * 0.75;
	const exampleBelowMaxDeposit = exmpleBelowCeiling * (rate / 100);

	return (
		<>
			<section>
				<h2>Contributions & Allowances</h2>
				<div className='section'>
					<p>
						A study fund allows you to save without paying capital gains tax on profit the fund
						generates and the contributions are a recognised expense, up to deposit limits and an
						income of ceiling of {formatCurrency('il', ceiling, 0)}. You cannot withdraw from the
						fund for 6 years in order to benefit from the capital gains exemption, unless using the
						funds to pay for a study/training programme.
					</p>
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
			<section>
				<h2>Deposit Examples</h2>
				<Cards
					type='example'
					title='Above the Income Ceiling'
					body={
						<>
							<p>
								An annual income of {formatCurrency('il', exmpleAboveCeiling, 0)} exceeds the income
								ceiling, so the following deposits amounts apply:
							</p>
							<ul>
								<li>
									{rate}% of your income exceeds the deposit limit, so you can deposit the maximum
									of {formatCurrency('il', maxDeposit, 0)} to be considered a recognised expense
								</li>
								<li>
									An additional {formatCurrency('il', capitalGainsLimit - maxDeposit, 0)} will be
									exempt from capital gains tax
								</li>
								<li>
									Any further deposits, over the {formatCurrency('il', capitalGainsLimit, 0)} limit,
									won't be eligible for any tax benefits
								</li>
							</ul>
						</>
					}
				/>
				<Cards
					type='example'
					title='Below the Income Ceiling'
					body={
						<>
							<p>
								An annual income of {formatCurrency('il', exmpleBelowCeiling, 0)} is less than the
								income ceiling, so the following deposits amounts apply:
							</p>
							<ul>
								<li>
									{rate}% of your income, {formatCurrency('il', exampleBelowMaxDeposit, 0)}, will be
									considered a recognised expense
								</li>
								<li>
									An additional{' '}
									{formatCurrency('il', capitalGainsLimit - exampleBelowMaxDeposit, 0)} will be
									exempt from capital gains tax
								</li>
								<li>
									Any further deposits, over the {formatCurrency('il', capitalGainsLimit, 0)} limit,
									won't be eligible for any tax benefits
								</li>
							</ul>
						</>
					}
				/>
			</section>
		</>
	);
}

StudyFundSelfEmployed.propTypes = {
	handleChange: globalProps.handleChange,
	taxData: payrollProps.taxData,
	taxYearIndex: payrollProps.taxYearIndex,
	employmentType: globalProps.employmentType
};

export default StudyFundSelfEmployed;
