import React from 'react';
import { object } from 'prop-types';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import LanguageSelector from '../navbar/language-selector/LanguageSelector';
import { LinkContainer } from 'react-router-bootstrap';

function NavigationMenu(props) {
	return (
		<Navbar ref={props.nav} expand="lg" sticky="top">
			<Container>
				<LinkContainer exact to="/">
					<Navbar.Brand>IsraelTax</Navbar.Brand>
				</LinkContainer>
				<LanguageSelector />
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkContainer exact to="/">
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<NavDropdown title="Employee">
							<LinkContainer to="/employee/net-pay-calculator">
								<NavDropdown.Item>Net Pay Calculator</NavDropdown.Item>
							</LinkContainer>
						</NavDropdown>
						<NavDropdown title="Self-employed ">
							<LinkContainer to="/self-employed/net-pay-calculator">
								<NavDropdown.Item>Net Pay Calculator</NavDropdown.Item>
							</LinkContainer>
							{/* <NavDropdown.Item href="#">End Of Year Calculator</NavDropdown.Item>
							<NavDropdown.Item href="#">Expenses Calculator</NavDropdown.Item>
							<NavDropdown.Item href="#">Recognised Expenses</NavDropdown.Item> */}
						</NavDropdown>
						{/* <Nav.Link href="#">Tax Bands</Nav.Link> */}
						{/* <NavDropdown title="Other Taxes" id="selfEemployed-nav">
							<NavDropdown.Item href="#">Capital Gains</NavDropdown.Item>
						</NavDropdown> */}
						{/* <Nav.Link href="#">Resources</Nav.Link> */}
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
