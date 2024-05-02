import React, { Component } from 'react';
import { globalProps } from '../../prop-types';
import taxData from '../../data/payroll';
import NetPayForm from './Form';
import NetPayResultsEmployee from './ResultsEmployee';
import NetPayResultsSelfEmployed from './ResultsSelfEmployed';
import { scrollToRef } from '../../utils/scrollToRef';
import { currentYearIndex } from '../../utils/globalVariables';

class NetPayCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taxYearIndex: currentYearIndex,
			baseIncome: '',
			creditPoints: '',
			bituachLeumiAdvance: '',
			pensionOption: 'legalMin',
			pensionType: props.employmentType === 'employee' ? 'percent' : 'shekel',
			pensionAmount: '',
			studyFundType: props.employmentType === 'employee' ? 'percent' : 'shekel',
			studyFundAmount: '',
			travelAllowance: '',
			foodAllowance: '',
			otherAllowance: '',
			annualBonus: '',
			commission: '',
			overtime: '',
			validated: false,
			showResultsTable: false
		};
		this.scrollPoint = React.createRef();
	}

	componentDidUpdate(prevProps) {
		//Reset state when change forms
		if (prevProps.employmentType !== this.props.employmentType) {
			this.setState({
				baseIncome: '',
				creditPoints: '',
				pensionOption: 'legalMin',
				pensionAmount: '',
				studyFundAmount: '',
				validated: false,
				showResultsTable: false
			});
			if (this.props.employmentType === 'employee') {
				this.setState({
					pensionType: 'percent',
					studyFundType: 'percent'
				});
			} else {
				this.setState({
					pensionType: 'shekel',
					studyFundType: 'shekel',
					travelAllowance: '',
					foodAllowance: '',
					otherAllowance: '',
					annualBonus: '',
					commission: '',
					overtime: ''
				});
			}
		}
	}

	handleChange = event => {
		const { name, value, type } = event.target;
		this.setState({
			[name]: type === 'number' ? parseFloat(value) || '' : value,
			showResultsTable: false
		});

		if (name === 'baseIncome' && value === '') {
			this.setState({
				pensionOption: 'legalMin'
			});
		}
	};

	handleSubmit = event => {
		const form = event.currentTarget;

		if (form.checkValidity() === true) {
			this.setState({
				showResultsTable: true,
				validated: false //Hides validation text
			});
			setTimeout(() => {
				scrollToRef(this.scrollPoint.current);
			}, 150);
		} else {
			this.setState({
				validated: true
			});
		}
		event.preventDefault();
		event.stopPropagation();
	};

	render() {
		return (
			<>
				<NetPayForm
					employmentType={this.props.employmentType}
					taxData={taxData}
					stateData={this.state}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
				{this.props.employmentType === 'employee' && (
					<NetPayResultsEmployee
						employmentType={this.props.employmentType}
						taxData={taxData}
						stateData={this.state}
						scrollPoint={this.scrollPoint}
					/>
				)}
				{this.props.employmentType === 'selfEmployed' && (
					<NetPayResultsSelfEmployed
						employmentType={this.props.employmentType}
						taxData={taxData}
						stateData={this.state}
						scrollPoint={this.scrollPoint}
					/>
				)}
			</>
		);
	}
}

NetPayCalculator.propTypes = {
	employmentType: globalProps.employmentType
};

export default NetPayCalculator;
