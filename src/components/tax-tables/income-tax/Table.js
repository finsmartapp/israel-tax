import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import PayrollTaxYearBtn from '../../buttons/PayrollYear';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatCurrency';

function IncomeTaxBandsTable(props) {
	const taxData = props.taxData;
	const taxYearIndex = props.taxYearIndex;
	const handleChange = props.handleChange;
	const taxBands = Object.keys(taxData[taxYearIndex].incomeTax);

	return (
		<section>
			<h2>Tax Band Table</h2>
			<p>
				Income tax is calculated on your annual income, but monthly bands have been included for
				comparrison.
			</p>
			<PayrollTaxYearBtn
				value={taxYearIndex}
				columns={['xs=auto']}
				handleChange={handleChange}
				controlled={true}
			/>
			<Table striped bordered className="table__3--reverse table__header--blue">
				<thead>
					<tr>
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
									{formatCurrency('il', min / 12, 0)}
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

IncomeTaxBandsTable.propTypes = {
	handleChange: globalProps.handleChange,
	taxData: payrollProps.taxData,
	taxYearIndex: payrollProps.taxYearIndex
	// stateData: globalProps.shape({
	// 	taxYearIndex: payrollProps.taxYearIndex
	// })
};

export default IncomeTaxBandsTable;
