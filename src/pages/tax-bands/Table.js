import React, { Component } from 'react';
import incomeTaxTables from '../../data/income-tax.json';
import TaxYearBtn from '../../components/buttons/TaxYear.js';
import TaxBandRates from './TableRates.js';

class TaxBandsTable extends Component {
	constructor() {
		super();
		this.state = {
			taxYearIndex: incomeTaxTables.length - 1
		};
	}

	handleChange = event => {
		this.setState({
			taxYearIndex: event.target.value
		});
	};

	render() {
		return (
			<>
				<TaxYearBtn
					handleChange={this.handleChange}
					controlled={true}
					startIndex={this.state.taxYearIndex}
				/>
				<TaxBandRates incomeTaxTables={incomeTaxTables} taxYearIndex={this.state.taxYearIndex} />
			</>
		);
	}
}

export default TaxBandsTable;
