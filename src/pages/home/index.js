import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/hero/Hero';

function Home() {
	return (
		<>
			<Hero />
			<ul>
				<Link to="/salaried/net-pay-calculator">
					<li>Salaried</li>
				</Link>
				<Link to="/self-employed/net-pay-calculator">
					<li>Self employed</li>
				</Link>
			</ul>
		</>
	);
}

export default Home;
