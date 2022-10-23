import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import Home from '../pages/home';
import NetPay from '../pages/calculators/NetPay';
import Navigation from '../components/navbar';
import LanguageContext from '../contexts/LanguageContext';
import EndOfYear from '../pages/calculators/EndOfYear';
import TaxTables from '../pages/tax-tables';
import ContributionTables from '../pages/contribution-tables';

class App extends Component {
	constructor() {
		super();
		this.state = {
			language: localStorage.getItem('languageSetting'),
			setLanguage: iso => {
				if (this.state.language !== iso) {
					localStorage.setItem('languageSetting', iso);
					this.setState({ language: localStorage.getItem('languageSetting') });
				}
			}
		};
	}

	componentDidMount() {
		if (this.state.language === null) {
			this.setState({ language: 'en' });
		}
	}

	render() {
		return (
			<Router basename='/israel-tax'>
				<LanguageContext.Provider value={this.state}>
					<Navigation />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route
							path='/employee/net-pay-calculator'
							render={() => <NetPay employmentType={'employee'} />}
						/>
						<Route
							path='/self-employed/net-pay-calculator'
							render={() => <NetPay employmentType={'selfEmployed'} />}
						/>
						<Route path='/self-employed/end-of-year-calculator' component={EndOfYear} />
						<Route path='/tax-rates/income-tax' render={() => <TaxTables page={1} />} />
						<Route path='/tax-rates/credit-points' render={() => <TaxTables page={2} />} />
						<Route
							path='/employee/study-fund'
							render={() => <ContributionTables page={1} employmentType={'employee'} />}
						/>
						<Route
							path='/self-employed/study-fund'
							render={() => <ContributionTables page={2} employmentType={'selfEmployed'} />}
						/>
					</Switch>
				</LanguageContext.Provider>
			</Router>
		);
	}
}

export default App;
