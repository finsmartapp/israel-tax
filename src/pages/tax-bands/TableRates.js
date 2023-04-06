import React from 'react';
import { payrollProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function TaxBandRates(props) {
	const { taxData, taxYearIndex } = props;
	const taxBands = Object.keys(taxData[taxYearIndex].incomeTax);

	return (
		<section>
			<Table striped bordered className='table--col-3-reverse'>
				<thead>
					<tr className='table__row-header table__row-header--primary'>
						<th>Rate</th>
						<th>Annual</th>
						<th>Monthly Equivalent</th>
					</tr>
				</thead>
				<tbody>
					{taxBands.map((taxBand, i) => {
						const { rate, min, max } = taxData[taxYearIndex].incomeTax[taxBand];

						return (
							<tr key={i}>
								<td>{rate}%</td>
								<td>
									{formatCurrency('il', min, 0)}
									{max !== undefined ? `-${formatCurrency('il', max, 0)}` : ' and above'}
								</td>
								<td>
									{formatCurrency('il', min === 0 ? min : min / 12 + 1, 0)}
									{max !== undefined ? `-${formatCurrency('il', max / 12, 0)}` : ' and above'}
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</section>
	);
}

TaxBandRates.propTypes = {
	taxData: payrollProps.taxData,
	taxYearIndex: payrollProps.taxYearIndex
};

export default TaxBandRates;
