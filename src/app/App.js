import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import Home from '../pages/home';
import Navigation from '../components/navbar';
import LanguageContext from '../contexts/LanguageContext';
import Footer from '../components/footer';
import NetPay from '../pages/net-pay';
import EndOfYear from '../pages/end-of-year';
import TaxBands from '../pages/tax-bands';
import CreditPoints from '../pages/credit-points';
import SelfEmployedPension from '../pages/pension-self-employed';
import EmployeePension from '../pages/pension-employee';
import SelfEmployedStudyFund from '../pages/study-fund-self-employed';
import EmployeeStudyFund from '../pages/study-fund-employee';

class App extends Component {
	constructor() {
		super();
		this.state = {
			language: this.getLanguage(),
			setLanguage: isoCode => {
				if (this.state.language !== isoCode) {
					localStorage.setItem('languageSetting', isoCode);
					this.setState({ language: isoCode });
				}
			}
		};
	}

	getLanguage = () => {
		const curentLanguage = localStorage.getItem('languageSetting');

		return curentLanguage === null ? 'en' : curentLanguage;
	};

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
						<Route path='/tax-rates/income-tax' component={TaxBands} />
						<Route path='/tax-rates/credit-points' component={CreditPoints} />
						<Route path='/self-employed/pension' component={SelfEmployedPension} />
						<Route path='/employee/pension' component={EmployeePension} />
						<Route path='/self-employed/study-fund' component={SelfEmployedStudyFund} />
						<Route path='/employee/study-fund' component={EmployeeStudyFund} />
					</Switch>
					<Footer />
				</LanguageContext.Provider>
			</Router>
		);
	}
}

export default App;
