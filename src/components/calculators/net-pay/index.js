import React, { Component } from 'react';
import { globalProps } from '../../../prop-types';
import taxData from '../../../data/payroll';
import './net-pay.scss';
import NetPayForm from './Form';
import ResultsEmployee from './ResultsEmployee';
import ResultsSelfEmployed from './ResultsSelfEmployed';

class NetPayCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taxYearIndex: 0,
			baseIncome: '',
			creditPoints: '',
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
		this.resultsTable = React.createRef();
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

	scrollToResults = () => {
		setTimeout(() => {
			this.resultsTable.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}, 150);
	};

	handleSubmit = event => {
		const form = event.currentTarget;

		if (form.checkValidity() === true) {
			this.setState({
				showResultsTable: true,
				validated: false //Hides validation text
			});
			this.scrollToResults();
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
					<ResultsEmployee
						employmentType={this.props.employmentType}
						taxData={taxData}
						stateData={this.state}
						resultsTable={this.resultsTable}
					/>
				)}
				{this.props.employmentType === 'selfEmployed' && (
					<ResultsSelfEmployed
						employmentType={this.props.employmentType}
						taxData={taxData}
						stateData={this.state}
						resultsTable={this.resultsTable}
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
