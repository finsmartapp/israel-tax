import React, { Component } from 'react';
import { incomeTaxProps } from '../../../../prop-types';
import IncomeTaxTable from './Table.js';
import '../breakdown.scss';

class IncomeTax extends Component {
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
		return (
			<IncomeTaxTable
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

IncomeTax.propTypes = {
	incomeTax: incomeTaxProps.incomeTax,
	annualIncomeTax: incomeTaxProps.annualIncomeTax,
	monthlyBandPayments: incomeTaxProps.monthlyBandPayments,
	annualBandPayments: incomeTaxProps.annualBandPayments,
	eoy: incomeTaxProps.eoy
};

export default IncomeTax;
