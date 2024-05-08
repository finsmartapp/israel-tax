import React from 'react';
import InfoCard from '../../../components/info-card';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Link } from 'react-router-dom';

export function pensionUnder(amount) {
	return (
		<InfoCard
			type='warning'
			title='Increase Your Pension Contribution for Maximum Tax Relief'
			body={
				<p>
					An additional contribution of {formatCurrency('il', amount)} to your pension will enable
					you to receive the maximum achievable tax benefit. See{' '}
					<Link to='/self-employed/pension#tax-relief' target='_blank'>
						pension tax relief
					</Link>{' '}
					for more information.
				</p>
			}
			close={true}
		/>
	);
}

export function pensionOver(amount) {
	return (
		<InfoCard
			type='danger'
			title='Pension Contribution Exceeds Maximum for Tax Relief'
			body={
				<p>
					You've exceeded the pension contribution limit for tax benefits by{' '}
					{formatCurrency('il', amount)}. However, whilst you won't receive any tax relief on that
					amount, it will still increase your pension fund! See{' '}
					<Link to='/self-employed/pension#tax-relief' target='_blank'>
						pension tax relief
					</Link>{' '}
					for more information.
				</p>
			}
			close={true}
		/>
	);
}

export function studyUnder(amount) {
	return (
		<InfoCard
			type='warning'
			title='Increase Your Study Fund Contribution for Maximum Tax Relief'
			body={
				<p>
					Study fund contributions are considered a recognised expense and an additional
					contribution of {formatCurrency('il', amount)} will enable you to receive the maximum
					achievable benefit. See{' '}
					<Link to='/self-employed/study-fund' target='_blank'>
						study fund tax relief
					</Link>{' '}
					for more information.
				</p>
			}
			close={true}
		/>
	);
}

export function studyOver(amount) {
	return (
		<InfoCard
			type='danger'
			title='Study Fund Contribution Exceeds Maximum for Tax Relief'
			body={
				<p>
					You've exceeded the study fund contribution limit for recognised expense benefits by{' '}
					{formatCurrency('il', amount)}. However, whilst you won't receive any relief on that
					amount, it will still increase your savings and may be eligible for capital gains tax
					discount! See{' '}
					<Link to='/self-employed/study-fund' target='_blank'>
						study fund tax relief
					</Link>{' '}
					for more information.
				</p>
			}
			close={true}
		/>
	);
}

export function studyUnderGains(amount) {
	return (
		<InfoCard
			type='warning'
			title='Increase Your Study Fund Contribution for Maximum Capital Gains Discount'
			body={
				<p>
					An additional contribution of {formatCurrency('il', amount)} to your study fund will
					enable you to receive the maximum achievable capital gains tax discount. See{' '}
					<Link to='/self-employed/study-fund' target='_blank'>
						study fund capital gains exemption
					</Link>{' '}
					for more information.
				</p>
			}
			close={true}
		/>
	);
}

export function studyOverGains(amount) {
	return (
		<InfoCard
			type='danger'
			title='Study Fund Contribution Exceeds Maximum for Capital Gains Discount'
			body={
				<p>
					You've exceeded the study fund contribution limit for capital gains tax discount by{' '}
					{formatCurrency('il', amount)}. However, whilst you won't receive any tax discount on that
					amount, it will still increase your savings! See{' '}
					<Link to='/self-employed/study-fund' target='_blank'>
						study fund capital gains exemption
					</Link>{' '}
					for more information.
				</p>
			}
			close={true}
		/>
	);
}
