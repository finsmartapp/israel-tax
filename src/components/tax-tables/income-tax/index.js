import React, { Component } from 'react';
// import { globalProps } from '../../../prop-types';
import taxData from '../../../data/payroll.json';
import IncomeTaxBandsTable from './Table.js';

class IncomeTaxBands extends Component {
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
			<IncomeTaxBandsTable
				taxData={taxData}
				taxYearIndex={this.state.taxYearIndex}
				handleChange={this.handleChange}
			/>
		);
	}
}

export default IncomeTaxBands;
