import React from 'react';
import { pensionProps } from '../../prop-types';
import { formatCurrency } from '../../utils/formatCurrency';
import Cards from '../../components/card';

function SelfEmployedPensionDepositExamples(props) {
	const { averageWage, averageWageHalf, reducedRate, fullRate, reducedMax, fullMax } = props;

	return (
		<section>
			<h2>Contribution Examples</h2>
			<Cards
				type='example'
				title='Monthly Deposit Example'
				body={
					<>
						<p>Up to 50% of the national average:</p>
						<ul>
							<li>
								Income of {formatCurrency('il', 0, 0)}-{formatCurrency('il', averageWageHalf, 0)}
							</li>
							<li>
								A deposit of {reducedRate}% is required on this portion of income, which is a
								maximum of {formatCurrency('il', reducedMax, 0)}
							</li>
						</ul>
						<p>Over 50% of the national average:</p>
						<ul>
							<li>
								Income of {formatCurrency('il', averageWageHalf + 1, 0)}-
								{formatCurrency('il', averageWage, 0)}
							</li>
							<li>
								A deposit of {fullRate}% is required on this portion of income, which is a maximum
								of {formatCurrency('il', fullMax, 0)}
							</li>
						</ul>
					</>
				}
			/>
		</section>
	);
}

SelfEmployedPensionDepositExamples.propTypes = {
	averageWage: pensionProps.averageWage,
	averageWageHalf: pensionProps.averageWageHalf,
	reducedRate: pensionProps.reducedRate,
	fullRate: pensionProps.fullRate,
	reducedMax: pensionProps.reducedMax,
	fullMax: pensionProps.fullMax
};

export default SelfEmployedPensionDepositExamples;
