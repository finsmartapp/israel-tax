import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/hero/Hero';

function Home() {
	return (
		<>
			<Hero />
			<ul>
				<Link to="/employee/net-pay-calculator">
					<li>Employee Net Pay Calculator</li>
				</Link>
				<Link to="/self-employed/net-pay-calculator">
					<li>Self-employed Net Pay Calculator</li>
				</Link>
				<Link to="/self-employed/end-of-year-calculator">
					<li>End of Year Calculator</li>
				</Link>
			</ul>
		</>
	);
}

export default Home;
