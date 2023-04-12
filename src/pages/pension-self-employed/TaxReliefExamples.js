import React from 'react';
import { pensionProps } from '../../prop-types';
import { formatCurrency } from '../../utils/formatCurrency';
import InfoCard from '../../components/info-card';

function SelfEmployedPensionTaxReliefExamples(props) {
	const {
		eligibleIncome,
		taxDeductableLimit,
		taxCreditLimit,
		taxCreditRate,
		taxCredit,
		ceiling,
		tierLimit,
		recognisedExpense,
		maxContribution,
		beneficiaryPayment
	} = props;
	const eligibleDeductable = eligibleIncome * (taxDeductableLimit / 100);
	const eligibleCredit = eligibleIncome * (taxCreditLimit / 100);
	const taxCreditContribution = tierLimit * (taxCreditLimit / 100);

	return (
		<section>
			<h2>Tax Relief Examples</h2>
			<InfoCard
				type='example'
				title='Eligible Income Salary'
				body={
					<>
						<p>
							If your annual income is {formatCurrency('il', eligibleIncome, 0)}, you can make the
							following deposits:
						</p>
						<ul>
							<li>
								{taxDeductableLimit}% of your income, {formatCurrency('il', eligibleDeductable, 0)},
								will be considered a recognised expense
							</li>
							<li>
								An additional {taxCreditLimit}% of your income,{' '}
								{formatCurrency('il', eligibleCredit, 0)}, will receive a tax credit of{' '}
								{taxCreditRate}%, equalling{' '}
								{formatCurrency('il', eligibleDeductable * (taxCreditLimit / 100), 0)}
							</li>
							<li>
								Total deposit amount of{' '}
								{formatCurrency('il', eligibleDeductable + eligibleCredit, 0)}. Any further deposits
								won't be eligible for any tax benefits
							</li>
						</ul>
					</>
				}
			/>
			<InfoCard
				type='example'
				title='Salary Above the Income Ceiling'
				body={
					<>
						<p>
							If your annual income is {formatCurrency('il', ceiling * 1.25, 0)}, it exceeds the
							eligible income limit and your contributions are subject to the tired system.
						</p>
						<p>
							The tier one ceiling is fixed at {formatCurrency('il', tierLimit, 0)}. The initial
							deposits that can be made are:
						</p>
						<ul>
							<li>
								{taxDeductableLimit}% of tier one, {formatCurrency('il', recognisedExpense, 0)},
								will be considered a recognised expense
							</li>
							<li>
								An additional {taxCreditLimit}%, {formatCurrency('il', taxCreditContribution, 0)},
								will receive a tax credit of {taxCreditRate}%, equalling{' '}
								{formatCurrency('il', taxCredit, 0)}
							</li>
						</ul>
						<p>
							The tier two ceiling is fixed at {formatCurrency('il', tierLimit, 0)}. The tax
							benefits of this tier are only available once you deposit an additional{' '}
							{formatCurrency('il', beneficiaryPayment, 0)} to gain beneficary status. No tax
							benefits are available on this amount, but you will receive them on the following:
						</p>
						<ul>
							<li>
								{taxDeductableLimit}% of tier two, {formatCurrency('il', recognisedExpense, 0)},
								will be considered a recognised expense
							</li>
							<li>
								An additional {taxCreditLimit}%, {formatCurrency('il', taxCreditContribution, 0)},
								will receive a tax credit of {taxCreditRate}%, equalling{' '}
								{formatCurrency('il', taxCredit, 0)}
							</li>
						</ul>
						<p>
							The total amount you need to deposit to gain the full tax benefits is{' '}
							{formatCurrency('il', maxContribution * 2 + beneficiaryPayment, 0)}.{' '}
							{formatCurrency('il', maxContribution, 0)} in tier one, plus the{' '}
							{formatCurrency('il', beneficiaryPayment, 0)} beneficiary payment, plus{' '}
							{formatCurrency('il', maxContribution, 0)} in tier two.
						</p>
					</>
				}
			/>
		</section>
	);
}

SelfEmployedPensionTaxReliefExamples.propTypes = {
	eligibleIncome: pensionProps.eligibleIncome,
	taxDeductableLimit: pensionProps.taxDeductableLimit,
	taxCredit: pensionProps.taxCredit,
	taxCreditLimit: pensionProps.taxCreditLimit,
	taxCreditRate: pensionProps.taxCreditRate,
	ceiling: pensionProps.ceiling,
	tierLimit: pensionProps.tierLimit,
	recognisedExpense: pensionProps.recognisedExpense,
	maxContribution: pensionProps.maxContribution,
	beneficiaryPayment: pensionProps.beneficiaryPayment
};

export default SelfEmployedPensionTaxReliefExamples;
