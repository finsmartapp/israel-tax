import React from 'react';
import { globalProps, panelProps } from '../../prop-types';

function PopupBox(props) {
	return (
		<div
			className="popup"
			style={{
				display: props.display === true ? 'block' : 'none'
			}}
		>
			<div className={`popup__box popup--${props.type}`}>
				<span className="close" onClick={props.handleClick}>
					&times;
				</span>
				<h2 className="popup-header">{props.title}</h2>
				<p>{props.text}</p>
			</div>
		</div>
	);
}

PopupBox.propTypes = {
	handleClick: globalProps.handleClick,
	display: globalProps.display,
	type: panelProps.type,
	title: panelProps.title,
	text: panelProps.text
};

export default PopupBox;
