import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import PayrollTaxYearBtn from '../../buttons/PayrollYear';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatCurrency';

function TaxBandssTable(props) {
	const { taxData, taxYearIndex, handleChange } = props;
	const taxBands = Object.keys(taxData[taxYearIndex].incomeTax);

	return (
		<section>
			<h2>Tax Bands</h2>
			<div className='section'>
				<p>
					Income tax is calculated on your annual income, but monthly bands have been included for
					comparrison.
				</p>
			</div>
			<PayrollTaxYearBtn
				value={taxYearIndex}
				columns={['xs=auto']}
				handleChange={handleChange}
				controlled={true}
			/>
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

TaxBandssTable.propTypes = {
	handleChange: globalProps.handleChange,
	taxData: payrollProps.taxData,
	taxYearIndex: payrollProps.taxYearIndex
};

export default TaxBandssTable;
