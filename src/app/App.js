import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/home';
import NetPayCalculator from '../pages/net-pay-calculators';

function App() {
	return (
		<Router basename="/israel-tax">
			<Switch>
				<Route path="/" exact component={Home} />
				<Route
					path="/calculators/salaried/net-pay"
					render={props => <NetPayCalculator {...props} employmentType={'salaried'} />}
				/>
				<Route
					path="/calculators/self-employed/net-pay"
					render={props => <NetPayCalculator {...props} employmentType={'selfEmployed'} />}
				/>
			</Switch>
		</Router>
	);
}

export default App;
