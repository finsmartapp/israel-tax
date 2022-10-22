import React, { Component } from 'react';
import taxData from '../../../data/payroll.json';
import TaxBandssTable from './Table.js';

class TaxBands extends Component {
	constructor() {
		super();
		this.state = {
			taxYearIndex: taxData.length - 1
		};
	}

	handleChange = event => {
		this.setState({
			taxYearIndex: event.target.value
		});
	};

	render() {
		return (
			<TaxBandssTable
				taxData={taxData}
				taxYearIndex={this.state.taxYearIndex}
				handleChange={this.handleChange}
			/>
		);
	}
}

export default TaxBands;
