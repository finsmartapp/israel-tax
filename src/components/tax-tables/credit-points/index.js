import React, { Component } from 'react';
import taxData from '../../../data/payroll.json';
import CreditPointsTable from './Table.js';

class CreditPoints extends Component {
	constructor() {
		super();
		this.state = {
			displayItems: 2
		};
	}

	handleClick = () => {
		const items = this.state.displayItems;
		const totalItems = taxData.length;
		const increment = 12;
		this.setState({
			displayItems: items + increment > totalItems ? totalItems : items + increment
		});
	};

	render() {
		return (
			<CreditPointsTable
				taxData={taxData}
				displayItems={this.state.displayItems}
				handleClick={this.handleClick}
			/>
		);
	}
}

export default CreditPoints;
