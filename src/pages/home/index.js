import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/page-container';
import Hero from '../../components/hero';

function Home() {
	return (
		<>
			<Hero h1="Israel Tax Information" />
			<PageContainer>
				<Row>
					<Col xs={12} sm={6}>
						<h2>Calculators</h2>
						<ul>
							<Link to="/employee/net-pay-calculator">
								<li>Employee Net Pay</li>
							</Link>
							<Link to="/self-employed/net-pay-calculator">
								<li>Self-employed Net Pay</li>
							</Link>
							<Link to="/self-employed/end-of-year-calculator">
								<li>End of Year</li>
							</Link>
						</ul>
					</Col>
					<Col xs={12} sm={6}>
						<h2>Tax Rate Tables</h2>
						<ul>
							<Link to="/tax-rates/income-tax">
								<li>Income Tax</li>
							</Link>
						</ul>
					</Col>
				</Row>
			</PageContainer>
		</>
	);
}

export default Home;
