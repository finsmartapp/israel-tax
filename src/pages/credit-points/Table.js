import React, { Component } from 'react';
import incomeTaxTables from '../../data/income-tax.json';
import CreditPointsTableValues from './TableValues.js';
import CreditPointsTableShowMore from './ShowMoreBtn';

class CreditPointsTable extends Component {
	constructor() {
		super();
		this.state = {
			displayItems: 2
		};
	}

	handleClick = () => {
		const items = this.state.displayItems;
		const totalItems = incomeTaxTables.length;
		const increment = 2;
		this.setState({
			displayItems: items + increment > totalItems ? totalItems : items + increment
		});
	};

	render() {
		return (
			<>
				<CreditPointsTableValues
					incomeTaxTables={incomeTaxTables}
					displayItems={this.state.displayItems}
				/>
				{this.state.displayItems < incomeTaxTables.length && (
					<CreditPointsTableShowMore handleClick={this.handleClick} />
				)}
			</>
		);
	}
}

export default CreditPointsTable;
