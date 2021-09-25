import React, { Component } from 'react';
import { globalProps } from '../../../prop-types';
import taxData from '../../../data/payroll';
import './net-pay.scss';
import NetPayForm from './Form';
import ResultsEmployee from './ResultsEmployee';
import ResultsSelfEmployed from './ResultsSelfEmployed';
import LanguageContext from '../../../contexts/LanguageContext';

class NetPay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taxData: taxData,
			taxYearIndex: 0,
			baseIncome: '',
			creditPoints: '',
			pensionOption: 'legalMin',
			pensionType: 'percent',
			pensionAmount: '',
			studyFundType: 'shekel',
			studyFundAmount: '',
			travelAllowance: '',
			lunchAllowance: '',
			otherAllowance: '',
			annualBonus: '',
			commission: '',
			overtime: '',
			validated: false,
			showResultsTable: false
		};
		this.resultsTable = React.createRef();
	}

	handleChange = event => {
		const { name, value, type } = event.target;
		this.setState({
			[name]: type === 'number' ? parseFloat(value) || '' : value,
			showResultsTable: false
		});

		if (name === 'pensionOption' && value === 'legalMin') {
			this.setState({
				pensionAmount: ''
			});
		}
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
				validated: false
			});
			this.scrollToResults();
		} else {
			this.setState({
				validated: true
			});
		}

		form.checkValidity();
		event.preventDefault();
		event.stopPropagation();
	};

	render() {
		return (
			<>
				<LanguageContext.Consumer>
					{value => (
						<NetPayForm
							employmentType={this.props.employmentType}
							stateData={this.state}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
							language={value.language}
						/>
					)}
				</LanguageContext.Consumer>
				{this.props.employmentType === 'employee' && (
					<ResultsEmployee
						employmentType={this.props.employmentType}
						stateData={this.state}
						resultsTable={this.resultsTable}
					/>
				)}
				{this.props.employmentType === 'selfEmployed' && (
					<ResultsSelfEmployed
						employmentType={this.props.employmentType}
						stateData={this.state}
						resultsTable={this.resultsTable}
					/>
				)}
			</>
		);
	}
}

NetPay.propTypes = {
	employmentType: globalProps.employmentType
};

export default NetPay;
