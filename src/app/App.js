import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import Home from '../pages/home';
import NetPayCalculator from '../pages/net-pay-calculators';
import Navigation from '../components/navbar/Navbar';
import LanguageContext from '../contexts/LanguageContext';

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
			<Router basename="/israel-tax">
				<LanguageContext.Provider value={this.state}>
					<Navigation />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							path="/employee/net-pay-calculator"
							render={() => <NetPayCalculator employmentType={'employee'} />}
						/>
						<Route
							path="/self-employed/net-pay-calculator"
							render={() => <NetPayCalculator employmentType={'selfEmployed'} />}
						/>
					</Switch>
				</LanguageContext.Provider>
			</Router>
		);
	}
}

export default App;
