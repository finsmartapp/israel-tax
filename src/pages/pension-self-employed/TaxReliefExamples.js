import React from 'react';
import { pensionProps } from '../../prop-types';
import { formatCurrency } from '../../utils/formatCurrency';
import InfoCard from '../../components/info-card';

function SelfEmployedPensionTaxReliefExamples(props) {
	const {
		eligibleIncome,
		taxDeductibleMaxPercent,
		taxCreditMaxPercent,
		taxCreditRate,
		taxCredit,
		ceiling,
		tierLimit,
		recognisedExpense,
		maxContribution,
		beneficiaryPayment
	} = props;
	const eligibleDeductible = eligibleIncome * (taxDeductibleMaxPercent / 100);
	const eligibleCredit = eligibleIncome * (taxCreditMaxPercent / 100);
	const taxCreditContribution = tierLimit * (taxCreditMaxPercent / 100);

	return (
		<section>
			<h2>Tax Relief Examples</h2>
			<InfoCard
				type='example'
				title='Eligible Income Salary'
				body={
					<>
						<p>
							If your annual income is {formatCurrency('il', eligibleIncome)}, you can make the
							following deposits:
						</p>
						<ul>
							<li>
								{taxDeductibleMaxPercent}% of your income,{' '}
								{formatCurrency('il', eligibleDeductible)}, will be considered a recognised expense
							</li>
							<li>
								An additional {taxCreditMaxPercent}% of your income,{' '}
								{formatCurrency('il', eligibleCredit)}, will receive a tax credit of {taxCreditRate}
								%, equalling{' '}
								{formatCurrency('il', eligibleDeductible * (taxCreditMaxPercent / 100))}
							</li>
							<li>
								Total deposit amount of {formatCurrency('il', eligibleDeductible + eligibleCredit)}.
								Any further deposits won't be eligible for any tax benefits
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
							If your annual income is {formatCurrency('il', ceiling * 1.25)}, it exceeds the
							eligible income limit and your contributions are subject to the tired system.
						</p>
						<p>
							The tier one ceiling is fixed at {formatCurrency('il', tierLimit)}. The initial
							deposits that can be made are:
						</p>
						<ul>
							<li>
								{taxDeductibleMaxPercent}% of tier one, {formatCurrency('il', recognisedExpense)},
								will be considered a recognised expense
							</li>
							<li>
								An additional {taxCreditMaxPercent}%, {formatCurrency('il', taxCreditContribution)},
								will receive a tax credit of {taxCreditRate}%, equalling{' '}
								{formatCurrency('il', taxCredit)}
							</li>
						</ul>
						<p>
							The tier two ceiling is fixed at {formatCurrency('il', tierLimit)}. The tax benefits
							of this tier are only available once you deposit an additional{' '}
							{formatCurrency('il', beneficiaryPayment)} to gain beneficary status. No tax benefits
							are available on this amount, but you will receive them on the following:
						</p>
						<ul>
							<li>
								{taxDeductibleMaxPercent}% of tier two, {formatCurrency('il', recognisedExpense)},
								will be considered a recognised expense
							</li>
							<li>
								An additional {taxCreditMaxPercent}%, {formatCurrency('il', taxCreditContribution)},
								will receive a tax credit of {taxCreditRate}%, equalling{' '}
								{formatCurrency('il', taxCredit)}
							</li>
						</ul>
						<p>
							The total amount you need to deposit to gain the full tax benefits is{' '}
							{formatCurrency('il', maxContribution * 2 + beneficiaryPayment)}.{' '}
							{formatCurrency('il', maxContribution)} in tier one, plus the{' '}
							{formatCurrency('il', beneficiaryPayment)} beneficiary payment, plus{' '}
							{formatCurrency('il', maxContribution)} in tier two.
						</p>
					</>
				}
			/>
		</section>
	);
}

SelfEmployedPensionTaxReliefExamples.propTypes = {
	eligibleIncome: pensionProps.eligibleIncome,
	taxDeductibleMaxPercent: pensionProps.taxDeductibleMaxPercent,
	taxCredit: pensionProps.taxCredit,
	taxCreditMaxPercent: pensionProps.taxCreditMaxPercent,
	taxCreditRate: pensionProps.taxCreditRate,
	ceiling: pensionProps.ceiling,
	tierLimit: pensionProps.tierLimit,
	recognisedExpense: pensionProps.recognisedExpense,
	maxContribution: pensionProps.maxContribution,
	beneficiaryPayment: pensionProps.beneficiaryPayment
};

export default SelfEmployedPensionTaxReliefExamples;
