import React from 'react';
import { globalProps, breakdownProps } from '../../prop-types';
import { formatCurrency } from '../../utils/formatCurrency';

function TableBreakdownRows(props) {
	const {
		rowHeader,
		monthTotal,
		annualTotal,
		monthBreakdown,
		annualBreakdown,
		active,
		handleClick,
		eoy,
		decimal
	} = props;
	const hasTax = annualTotal > 0;
	const monthColumn = eoy ? false : true;

	return (
		<>
			<tr>
				<td>
					{rowHeader}
					<button
						className='btn-link btn-link--breakdown'
						aria-pressed={active ? 'true' : 'false'}
						onClick={handleClick}
						style={{ display: hasTax ? 'inline-block' : 'none' }}
					>
						BREAKDOWN
					</button>
				</td>
				{monthColumn && <td>{formatCurrency('il', monthTotal, decimal)}</td>}
				<td>{formatCurrency('il', annualTotal, decimal)}</td>
			</tr>
			{active && (
				<>
					{monthBreakdown.map((monthlyBand, i) => {
						const rate = Object.keys(monthlyBand);
						const tax = Object.values(monthlyBand);
						const isAnnual = i <= annualBreakdown.length - 1;

						return (
							<tr key={i} className='breakdown-row'>
								<td>{rate}% Rate</td>
								{monthColumn && <td>{formatCurrency('il', tax, decimal)}</td>}
								<td>{formatCurrency('il', isAnnual ? annualBreakdown[i][rate] : 0, decimal)}</td>
							</tr>
						);
					})}
				</>
			)}
		</>
	);
}

TableBreakdownRows.propTypes = {
	handleClick: globalProps.handleClick,
	active: globalProps.active,
	rowHeader: breakdownProps.rowHeader,
	monthTotal: breakdownProps.monthTotal,
	annualTotal: breakdownProps.annualTotal,
	monthBreakdown: breakdownProps.monthBreakdown,
	annualBreakdown: breakdownProps.annualBreakdown,
	eoy: breakdownProps.eoy,
	decimal: globalProps.decimal
};

export default TableBreakdownRows;
