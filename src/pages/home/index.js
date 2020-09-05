import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/hero/Hero';

function Home() {
	return (
		<>
			<Hero />
			<ul>
				<Link to="/calculators/salaried/net-pay">
					<li>Salaried</li>
				</Link>
				<Link to="/calculators/self-employed/net-pay">
					<li>Self employed</li>
				</Link>
			</ul>
		</>
	);
}

export default Home;
