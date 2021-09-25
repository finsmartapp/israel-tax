import React, { Component } from 'react';
import { panelProps } from '../../prop-types';
import './popup.scss';
import PopupBox from './PopupBox';

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: true
		};
	}

	componentDidMount() {
		document.querySelector('body').style.overflow = 'hidden';
	}

	handleClick = () => {
		this.setState({ display: false });
		document.querySelector('body').style.overflow = '';
	};

	render() {
		return (
			<PopupBox
				display={this.state.display}
				type={this.props.type}
				title={this.props.title}
				text={this.props.text}
				handleClick={this.handleClick}
			/>
		);
	}
}

Popup.propTypes = {
	type: panelProps.type,
	title: panelProps.title,
	text: panelProps.text
};

export default Popup;
