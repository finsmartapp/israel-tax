import React, { Component } from 'react';
import { globalProps } from '../../../prop-types/Global';
import taxData from '../../../data/payroll';
import './net-pay.scss';
import NetPayForm from './Form';
import ResultsSalaried from './ResultsSalaried';
import ResultsSelfEmployed from './ResultsSelfEmployed';
import LanguageContext from '../../../contexts/LanguageContext';

class NetPayContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employmentType: props.employmentType,
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

	scrollToMyRef = () => {
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
			this.scrollToMyRef();
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
							stateData={this.state}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit}
							employmentType={this.props.employmentType}
							language={value.language}
						/>
					)}
				</LanguageContext.Consumer>
				{this.state.employmentType === 'salaried' && (
					<ResultsSalaried stateData={this.state} refProp={this.resultsTable} />
				)}
				{this.state.employmentType === 'selfEmployed' && (
					<ResultsSelfEmployed stateData={this.state} refProp={this.resultsTable} />
				)}
			</>
		);
	}
}

NetPayContainer.propTypes = {
	employmentType: globalProps.employmentType
};

export default NetPayContainer;
