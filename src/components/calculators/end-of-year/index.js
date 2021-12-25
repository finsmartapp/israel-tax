import React, { Component } from 'react';
import taxData from '../../../data/payroll';
import './end-of-year.scss';
import EndOfYearForm from './Form';
import EndOfYearResults from './Results';

class EndOfYearCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taxData: taxData,
			fiscalPeriod: 'annual',
			taxYearIndex: 0,
			income: [''],
			expenses: [''],
			profit: [''],
			creditPoints: [''],
			pensionOption: ['legalMin'],
			pensionType: ['shekel'],
			pensionAmount: [''],
			studyFundOption: ['none'],
			studyFundType: ['shekel'],
			studyFundAmount: [''],
			validated: false,
			showResultsTable: false
		};
		this.resultsTable = React.createRef();
	}

	componentDidUpdate(prevProps, prevState) {
		//Reset state when change forms

		const indexes =
			this.state.fiscalPeriod === 'annual' ? 1 : this.state.fiscalPeriod === 'quarterly' ? 4 : 12;

		if (prevState.fiscalPeriod !== this.state.fiscalPeriod) {
			this.setState({
				income: Array(indexes).fill(''),
				expenses: Array(indexes).fill(''),
				profit: Array(indexes).fill(''),
				creditPoints: Array(indexes).fill(''),
				pensionOption: Array(indexes).fill('legalMin'),
				pensionType: Array(indexes).fill('shekel'),
				pensionAmount: Array(indexes).fill(''),
				studyFundOption: Array(indexes).fill('none'),
				studyFundType: Array(indexes).fill('shekel'),
				studyFundAmount: Array(indexes).fill(''),
				validated: false
			});
		}
	}

	handleChange = event => {
		const { name, value, type } = event.target;
		const stateIndex = name.match(/\d+/);
		const stateName = name.replace(stateIndex, '');

		if (stateIndex === null) {
			this.setState({
				[name]: type === 'number' ? parseFloat(value) || '' : value
			});
		} else {
			const copyState = name => {
				return [...this.state[name]];
			};
			const newState = copyState(stateName);
			const newValue = type === 'number' ? parseFloat(value) || '' : value;
			newState.splice(stateIndex, 1, newValue);

			this.setState({
				[stateName]: newState
			});

			if (stateName === 'income') {
				let setProfit = copyState('expenses');
				setProfit.splice(stateIndex, 1, value - setProfit[stateIndex]);

				this.setState({
					profit: setProfit
				});
			} else if (stateName === 'expenses') {
				let setProfit = copyState('income');
				setProfit.splice(stateIndex, 1, setProfit[stateIndex] - value);

				this.setState({
					profit: setProfit
				});
			}

			if (
				stateName === 'profit' &&
				value === '' &&
				this.state.pensionOption[stateIndex] === 'custom'
			) {
				let setPensionOption = copyState('pensionOption');
				setPensionOption.splice(stateIndex, 1, 'legalMin');

				this.setState({
					pensionOption: setPensionOption
				});
			}

			if (
				stateName === 'pensionOption' &&
				value !== '' &&
				this.state.pensionOption[stateIndex] === 'legalMin'
			) {
				let setPensionAmount = copyState('pensionAmount');
				setPensionAmount.splice(stateIndex, 1, '');

				this.setState({
					pensionAmount: setPensionAmount
				});
			}
		}
		this.setState({
			showResultsTable: false
		});
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
				<EndOfYearForm
					stateData={this.state}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
				<EndOfYearResults stateData={this.state} resultsTable={this.resultsTable} />
			</>
		);
	}
}

export default EndOfYearCalculator;
