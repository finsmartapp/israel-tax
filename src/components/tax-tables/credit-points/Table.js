import React from 'react';
import { globalProps, payrollProps } from '../../../prop-types';
import { Table } from 'react-bootstrap';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Button } from 'react-bootstrap';

function CreditPointsTable(props) {
	const taxData = props.taxData;
	const allItems = taxData.length;
	const displayItems = props.displayItems;
	const displayYears = [];
	const handleClick = props.handleClick;
	for (let i = allItems - 1; i >= allItems - displayItems; i--) {
		displayYears.push(taxData[i]);
	}

	return (
		<section>
			<h2>Credit Point Values</h2>
			<p>
				Tax credit points reduce the amount of income tax you pay. Once your total tax liability has
				been calculated, the value of your credit points is deducted. A man receives 2.25 points a
				month and a womnan 2.75. Additional points are awarded to{' '}
				<a href='https://www.gov.il/en/departments/general/introducing_innovative_reforms'>
					new olim and returning residents
				</a>
				,{' '}
				<a href='https://www.gov.il/en/departments/guides/tax-benefits-for-parents-with-small-children'>
					parents of young children
				</a>{' '}
				and the disabled.
			</p>
			<div className='container--sm'>
				<Table striped bordered className='table__2 table__header--blue'>
					<thead>
						<tr>
							<th>Year</th>
							<th>Value</th>
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
			{displayItems < allItems && (
				<Button type='button' variant='primary' onClick={handleClick}>
					View previous years
				</Button>
			)}
		</section>
	);
}

CreditPointsTable.propTypes = {
	handleClick: globalProps.handleClick,
	displayItems: globalProps.displayItems,
	taxData: payrollProps.taxData
};

export default CreditPointsTable;
