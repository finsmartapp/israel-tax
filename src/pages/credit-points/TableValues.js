import React from 'react';
import { globalProps, payrollProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function CreditPointsTableValues(props) {
	const { taxData, displayItems } = props;
	const allItems = taxData.length;
	let displayYears = [];

	for (let i = allItems - 1; i >= allItems - displayItems; i--) {
		displayYears.push(taxData[i]);
	}

	return (
		<section>
			<div className='container--sm'>
				<Table striped bordered className='table--equal'>
					<thead>
						<tr className='table__row-header table__row-header--primary'>
							<th>Year</th>
							<th>Point Value</th>
						</tr>
					</thead>
					<tbody>
						{displayYears.map((year, i) => {
							const taxYear = year.taxYear;
							const creditPoint = year.creditPoint;

							return (
								<tr key={i}>
									<td>{taxYear}</td>
									<td>{formatCurrency('il', creditPoint, 0)}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</section>
	);
}

CreditPointsTableValues.propTypes = {
	displayItems: globalProps.displayItems,
	taxData: payrollProps.taxData
};

export default CreditPointsTableValues;
