import React, { Component } from 'react';
import taxData from '../../data/payroll.json';
import PayrollTaxYearBtn from '../../components/buttons/PayrollYear';
import TaxBandRates from './TableRates.js';

class TaxBandsTable extends Component {
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
			<>
				<PayrollTaxYearBtn
					handleChange={this.handleChange}
					controlled={true}
					startIndex={this.state.taxYearIndex}
				/>
				<TaxBandRates taxData={taxData} taxYearIndex={this.state.taxYearIndex} />
			</>
		);
	}
}

export default TaxBandsTable;
