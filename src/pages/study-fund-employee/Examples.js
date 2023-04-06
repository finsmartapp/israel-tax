import React from 'react';
import { studyProps } from '../../prop-types';
import { formatCurrency } from '../../utils/formatCurrency';
import Cards from '../../components/card';

function EmployeeStudyFundExamples(props) {
	const { employeeRate, employerRate, ceiling } = props;
	const maxEmployeeDeposit = ceiling * (employeeRate / 100);
	const maxEmployerDeposit = ceiling * (employerRate / 100);
	const exmpleAboveCeiling = ceiling * 1.25;
	const exmpleBelowCeiling = ceiling * 0.75;
	const exampleBelowMaxDepositEmployee = exmpleBelowCeiling * (employeeRate / 100);
	const exampleBelowMaxDepositEmployer = exmpleBelowCeiling * (employerRate / 100);

	return (
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
							{formatCurrency('il', exmpleBelowCeiling / 12, 0)} a month), it's less than the income
							ceiling and the following deposits amounts apply:
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
	);
}

EmployeeStudyFundExamples.propTypes = {
	ceiling: studyProps.ceiling,
	employeeRate: studyProps.ceiling,
	employerRate: studyProps.ceiling
};

export default EmployeeStudyFundExamples;
