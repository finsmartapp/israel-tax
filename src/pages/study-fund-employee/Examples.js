import React from 'react';
import { studyProps } from '../../prop-types';
import { formatCurrency } from '../../utils/formatCurrency';
import InfoCard from '../../components/info-card';

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
			<InfoCard
				type='example'
				title='Salary Above the Income Ceiling'
				body={
					<>
						<p>
							If your annual income is {formatCurrency('il', exmpleAboveCeiling)} (
							{formatCurrency('il', exmpleAboveCeiling / 12)} a month), it exceeds the income
							ceiling and the following deposit amounts apply:
						</p>
						<ul>
							<li>
								{employeeRate}% of your income exceeds the deposit limit, so you can deposit the
								maximum of
								<ul>
									<li>{formatCurrency('il', maxEmployeeDeposit / 12)} a month</li>
									<li>{formatCurrency('il', maxEmployeeDeposit)} a year</li>
								</ul>
							</li>
							<li>
								{employerRate}% of your income exceeds the deposit limit, so your employer can
								deposit the maximum of
								<ul>
									<li>{formatCurrency('il', maxEmployerDeposit / 12)} a month</li>
									<li>{formatCurrency('il', maxEmployerDeposit)} a year</li>
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
			<InfoCard
				type='example'
				title='Salary Below the Income Ceiling'
				body={
					<>
						<p>
							If your annual income is {formatCurrency('il', exmpleBelowCeiling)} (
							{formatCurrency('il', exmpleBelowCeiling / 12)} a month), it's less than the income
							ceiling and the following deposits amounts apply:
						</p>
						<ul>
							<li>
								{employeeRate}% of your income
								<ul>
									<li>{formatCurrency('il', exampleBelowMaxDepositEmployee / 12)} a month</li>
									<li>{formatCurrency('il', exampleBelowMaxDepositEmployee)} a year</li>
								</ul>
							</li>
							<li>
								{employerRate}% from your employer
								<ul>
									<li>{formatCurrency('il', exampleBelowMaxDepositEmployer / 12)} a month</li>
									<li>{formatCurrency('il', exampleBelowMaxDepositEmployer)} a year</li>
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
