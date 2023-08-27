import React from 'react';
import { pensionProps } from '../../prop-types';
import { formatCurrency } from '../../utils/formatCurrency';
import InfoCard from '../../components/info-card';

function SelfEmployedPensionDepositExamples(props) {
	const { averageWage, averageWageHalf, reducedRate, fullRate, reducedMax, fullMax } = props;

	return (
		<section>
			<h2>Contribution Examples</h2>
			<InfoCard
				type='example'
				title='Monthly Deposit Example'
				body={
					<>
						<p>Up to 50% of the national average:</p>
						<ul>
							<li>
								Income of {formatCurrency('il', 0)}-{formatCurrency('il', averageWageHalf)}
							</li>
							<li>
								A deposit of {reducedRate}% is required on this portion of income, which is a
								maximum of {formatCurrency('il', reducedMax)}
							</li>
						</ul>
						<p>Over 50% of the national average:</p>
						<ul>
							<li>
								Income of {formatCurrency('il', averageWageHalf + 1)}-
								{formatCurrency('il', averageWage)}
							</li>
							<li>
								A deposit of {fullRate}% is required on this portion of income, which is a maximum
								of {formatCurrency('il', fullMax)}
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
