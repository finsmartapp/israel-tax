import React, { Component } from 'react';
import { incomeTaxProps } from '../../../prop-types';
import IncomeTaxBreakdownTable from './Table.js';
import '../net-breakdown.scss';

class IncomeTaxBreakdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	handleClick = event => {
		const showBreakdown = event.target.ariaPressed === 'true' ? true : false;
		this.setState({ active: showBreakdown ? false : true });
	};

	render() {
		console.log(this.props);
		return (
			<IncomeTaxBreakdownTable
				active={this.state.active}
				incomeTax={this.props.incomeTax}
				annualIncomeTax={this.props.annualIncomeTax}
				monthlyBandPayments={this.props.monthlyBandPayments}
				annualBandPayments={this.props.annualBandPayments}
				handleClick={this.handleClick}
				eoy={this.props.eoy}
			/>
		);
	}
}

IncomeTaxBreakdown.propTypes = {
	incomeTax: incomeTaxProps.incomeTax,
	annualIncomeTax: incomeTaxProps.annualIncomeTax,
	monthlyBandPayments: incomeTaxProps.monthlyBandPayments,
	annualBandPayments: incomeTaxProps.annualBandPayments,
	eoy: incomeTaxProps.eoy
};

export default IncomeTaxBreakdown;
