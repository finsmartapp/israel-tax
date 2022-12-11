import React, { Component } from 'react';
import { globalProps } from '../../../prop-types';
import taxData from '../../../data/payroll.json';
import StudyFundEmployee from './Employee.js';
import StudyFundSelfEmployed from './SelfEmployed.js';

class StudyFund extends Component {
	constructor(props) {
		super(props);
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
				{this.props.employmentType === 'employee' && (
					<StudyFundEmployee
						taxData={taxData}
						taxYearIndex={this.state.taxYearIndex}
						handleChange={this.handleChange}
						employmentType={this.props.employmentType}
					/>
				)}

				{this.props.employmentType === 'selfEmployed' && (
					<StudyFundSelfEmployed
						taxData={taxData}
						taxYearIndex={this.state.taxYearIndex}
						handleChange={this.handleChange}
						employmentType={this.props.employmentType}
					/>
				)}
			</>
		);
	}
}

StudyFund.propTypes = {
	employmentType: globalProps.employmentType
};

export default StudyFund;
