import React, { Component } from 'react';
import taxData from '../../data/payroll';
import './end-of-year.scss';
import EndOfYearForm from './Form';
import EndOfYearResults from './Results';
import { scrollToRef } from '../../utils/scrollToRef';

class EndOfYearCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		this.scrollPoint = React.createRef();
	}

	componentDidUpdate(prevProps, prevState) {
		//Reset state when change fiscal input choice
		const fiscalPeriod = this.state.fiscalPeriod;
		const indexes = fiscalPeriod === 'annual' ? 1 : fiscalPeriod === 'quarterly' ? 4 : 12;

		if (prevState.fiscalPeriod !== fiscalPeriod) {
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
		//End
	}

	handleChange = event => {
		const { name, value, type } = event.target;
		const { pensionOption } = this.state;
		const stateIndex = parseInt(name.match(/\d+/));
		const stateName = name.replace(stateIndex, '');
		//Iterate array and update the changed  value
		const updateArray = (stateID, changedValue) => {
			return [...this.state[stateID]].map((currentValue, i) => {
				return i === stateIndex ? changedValue : currentValue;
			});
		};
		//End

		if (isNaN(stateIndex)) {
			this.setState({
				[name]: type === 'number' ? parseFloat(value) || '' : value
			});
		} else {
			const newValue = type === 'number' ? parseFloat(value) || '' : value;
			this.setState({
				[stateName]: updateArray(stateName, newValue)
			});

			if (stateName === 'income' || stateName === 'expenses') {
				const isIncome = stateName === 'income' && true;
				const profitValue = isIncome
					? value - this.state.expenses[stateIndex]
					: this.state.income[stateIndex] - value;

				if (profitValue <= 0 && pensionOption[stateIndex] === 'custom') {
					this.setState({
						pensionOption: updateArray('pensionOption', 'legalMin')
					});
				}

				this.setState({
					profit: updateArray('profit', profitValue)
				});
			} else if (stateName === 'profit' && value <= 0 && pensionOption[stateIndex] === 'custom') {
				this.setState({
					pensionOption: updateArray('pensionOption', 'legalMin')
				});
			}
		}
		this.setState({
			showResultsTable: false
		});
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
				<EndOfYearForm
					stateData={this.state}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
				<EndOfYearResults taxData={taxData} stateData={this.state} scrollPoint={this.scrollPoint} />
			</>
		);
	}
}

export default EndOfYearCalculator;
