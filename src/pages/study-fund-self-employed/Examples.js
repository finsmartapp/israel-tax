import React from 'react';
import { studyProps } from '../../prop-types';
import { formatCurrency } from '../../utils/formatCurrency';
import InfoCard from '../../components/info-card';

function SelfEmployedStudyExamples(props) {
	const { rate, ceiling, capitalGainsLimit, maxDeposit } = props;
	const exmpleAboveCeiling = ceiling * 1.25;
	const exmpleBelowCeiling = ceiling * 0.75;
	const exampleBelowMaxDeposit = exmpleBelowCeiling * (rate / 100);

	return (
		<section>
			<h2>Deposit Examples</h2>
			<InfoCard
				type='example'
				title='Salary Above the Income Ceiling'
				body={
					<>
						<p>
							If your annual income is {formatCurrency('il', exmpleAboveCeiling, 0)}, it exceeds the
							income ceiling and the following deposit amounts apply:
						</p>
						<ul>
							<li>
								{rate}% of your income exceeds the deposit limit, so you can deposit the maximum of{' '}
								{formatCurrency('il', maxDeposit, 0)} to be considered a recognised expense
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
			<InfoCard
				type='example'
				title='Salary Below the Income Ceiling'
				body={
					<>
						<p>
							If your annual income is {formatCurrency('il', exmpleBelowCeiling, 0)}, it's less than
							the income ceiling and the following deposit amounts apply:
						</p>
						<ul>
							<li>
								{rate}% of your income, {formatCurrency('il', exampleBelowMaxDeposit, 0)}, will be
								considered a recognised expense
							</li>
							<li>
								An additional {formatCurrency('il', capitalGainsLimit - exampleBelowMaxDeposit, 0)}{' '}
								will be exempt from capital gains tax
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
	);
}

SelfEmployedStudyExamples.propTypes = {
	ceiling: studyProps.ceiling,
	rate: studyProps.rate,
	capitalGainsLimit: studyProps.capitalGainsLimit,
	maxDeposit: studyProps.maxDeposit
};

export default SelfEmployedStudyExamples;
