import React from 'react';
import { func, bool, string } from 'prop-types';

function PopupBox(props) {
	return (
		<div
			className="popup"
			style={{
				display: props.show === true ? 'block' : 'none'
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
	handleClick: func,
	show: bool.isRequired,
	type: string.isRequired,
	title: string.isRequired,
	text: string.isRequired
};

export default PopupBox;
