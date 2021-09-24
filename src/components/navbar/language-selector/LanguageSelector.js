import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './language-selector.scss';
import LanguageContext from '../../../contexts/LanguageContext';

function LanguageSelector() {
	return (
		<LanguageContext.Consumer>
			{value => (
				<Dropdown onSelect={value.setLanguage} className="language-selector">
					<Dropdown.Toggle as="div" className={`flag-${value.language}`}>
						&nbsp;<span className="visually-hidden">Select a language</span>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item eventKey="en" className="flag-en">
							English
						</Dropdown.Item>
						<Dropdown.Item eventKey="za" className="flag-za">
							South African
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			)}
		</LanguageContext.Consumer>
	);
}

export default LanguageSelector;
