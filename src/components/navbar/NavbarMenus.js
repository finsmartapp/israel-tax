import React from 'react';
import { object } from 'prop-types';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import LanguageSelector from '../navbar/language-selector/LanguageSelector';

function NavigationMenu(props) {
	return (
		<Navbar ref={props.nav} expand="lg" sticky="top">
			<Container>
				<Navbar.Brand href="/">IsraelTax</Navbar.Brand>
				<LanguageSelector />
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<NavDropdown title="Salaried">
							<NavDropdown.Item href="/salaried/net-pay-calculator">
								Net Pay Calculator
							</NavDropdown.Item>
						</NavDropdown>
						<NavDropdown title="Self-employed ">
							<NavDropdown.Item href="/self-employed/net-pay-calculator">
								Net Pay Calculator
							</NavDropdown.Item>
							{/* <NavDropdown.Item href="#">End Of Year Calculator</NavDropdown.Item>
							<NavDropdown.Item href="#">Expenses Calculator</NavDropdown.Item>
							<NavDropdown.Item href="#">Recognised Expenses</NavDropdown.Item> */}
						</NavDropdown>
						{/* <Nav.Link href="#">Tax Bands</Nav.Link>
						<NavDropdown title="Other Taxes" id="selfEemployed-nav">
							<NavDropdown.Item href="#">Capital Gains</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link href="#">Resources</Nav.Link> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

NavigationMenu.propTypes = {
	nav: object.isRequired
};

export default NavigationMenu;
