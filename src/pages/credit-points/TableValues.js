import React from 'react';
import { globalProps, taxProps } from '../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function CreditPointsTableValues(props) {
	const { incomeTaxTables, displayItems } = props;
	const allItems = incomeTaxTables.length;
	let displayYears = [];

	for (let i = allItems - 1; i >= allItems - displayItems; i--) {
		displayYears.push(incomeTaxTables[i]);
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
									<td>{formatCurrency('il', creditPoint)}</td>
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
	incomeTaxTables: taxProps.incomeTaxTables
};

export default CreditPointsTableValues;
