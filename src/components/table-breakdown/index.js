import React, { Component } from 'react';
import { breakdownProps, globalProps } from '../../prop-types';
import TableBreakdownRows from './BreakdownRows.js';
import './table-breakdown.scss';

class TableBreakdown extends Component {
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
			<TableBreakdownRows
				active={this.state.active}
				rowHeader={this.props.rowHeader}
				monthTotal={this.props.monthTotal}
				annualTotal={this.props.annualTotal}
				monthBreakdown={this.props.monthBreakdown}
				annualBreakdown={this.props.annualBreakdown}
				handleClick={this.handleClick}
				eoy={this.props.eoy}
				decimal={this.props.decimal}
			/>
		);
	}
}

TableBreakdown.propTypes = {
	rowHeader: breakdownProps.rowHeader,
	monthTotal: breakdownProps.monthTotal,
	annualTotal: breakdownProps.annualTotal,
	monthBreakdown: breakdownProps.monthBreakdown,
	annualBreakdown: breakdownProps.annualBreakdown,
	eoy: breakdownProps.eoy,
	decimal: globalProps.decimal
};

export default TableBreakdown;
