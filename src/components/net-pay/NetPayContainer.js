import React, { Component } from 'react';
import PropTypes from 'prop-types';
import taxData from '../../data/PayrollTax';
import './NetPay.scss';
import NetPayForm from './NetPayForm';
import NetPayResultsSalaried from './NetPayResultsSalaried';
import NetPayResultsSelfEmployed from './NetPayResultsSelfEmp';

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
			studyFundType: 'percent',
			studyFundAmount: '',
			travelAllowance: '',
			lunchAllowance: '',
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
				<NetPayForm
					stateData={this.state}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
				{this.state.employmentType === 'salaried' && (
					<NetPayResultsSalaried stateData={this.state} refProp={this.resultsTable} />
				)}
				{this.state.employmentType === 'selfEmployed' && (
					<NetPayResultsSelfEmployed stateData={this.state} refProp={this.resultsTable} />
				)}
			</>
		);
	}
}

NetPayContainer.propTypes = {
	employmentType: PropTypes.string
};

export default NetPayContainer;
