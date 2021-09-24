import React, { Component } from 'react';
import { string } from 'prop-types';
import './popup.scss';
import PopupBox from './PopupBox';

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true
		};
	}

	componentDidMount() {
		document.querySelector('body').style.overflow = 'hidden';
	}

	handleClick = () => {
		this.setState({ show: false });
		document.querySelector('body').style.overflow = '';
	};

	render() {
		return (
			<PopupBox
				show={this.state.show}
				type={this.props.type}
				title={this.props.title}
				text={this.props.text}
				handleClick={this.handleClick}
			/>
		);
	}
}

Popup.propTypes = {
	type: string.isRequired,
	title: string.isRequired,
	text: string.isRequired
};

export default Popup;
