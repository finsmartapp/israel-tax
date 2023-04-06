import React, { Component } from 'react';
import taxData from '../../data/payroll.json';
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
		const totalItems = taxData.length;
		const increment = 2;
		this.setState({
			displayItems: items + increment > totalItems ? totalItems : items + increment
		});
	};

	render() {
		return (
			<>
				<CreditPointsTableValues taxData={taxData} displayItems={this.state.displayItems} />
				{this.state.displayItems < taxData.length && (
					<CreditPointsTableShowMore handleClick={this.handleClick} />
				)}
			</>
		);
	}
}

export default CreditPointsTable;
