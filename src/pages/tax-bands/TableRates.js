import React from 'react';
import { taxProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function TaxBandRates(props) {
	const { incomeTaxTables, taxYearIndex } = props;
	const taxBands = Object.keys(incomeTaxTables[taxYearIndex].incomeTax);

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
						const { rate, min, max } = incomeTaxTables[taxYearIndex].incomeTax[taxBand];

						return (
							<tr key={i}>
								<td>{rate}%</td>
								<td>
									{formatCurrency('il', min)}
									{max !== undefined ? `-${formatCurrency('il', max)}` : ' and above'}
								</td>
								<td>
									{formatCurrency('il', min === 0 ? min : min / 12 + 1)}
									{max !== undefined ? `-${formatCurrency('il', max / 12)}` : ' and above'}
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
	incomeTaxTables: taxProps.incomeTaxTables,
	taxYearIndex: taxProps.taxYearIndex
};

export default TaxBandRates;
