import React, { Component } from 'react';
import taxData from '../../../../data/payroll.json';
import SelfEmployedPensionRates from './Rate.js';
import SelfEmployedPensionExpense from './Expense.js';

class SelfEmployedPension extends Component {
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
				<SelfEmployedPensionRates
					taxData={taxData}
					taxYearIndex={this.state.taxYearIndex}
					handleChange={this.handleChange}
				/>
				<SelfEmployedPensionExpense taxData={taxData} taxYearIndex={this.state.taxYearIndex} />
			</>
		);
	}
}

export default SelfEmployedPension;
