import React, { Component } from 'react';
import './navbar.scss';
import NavigationMenu from './NavbarMenus';

class Navigation extends Component {
	constructor() {
		super();
		this.nav = React.createRef();
	}

	componentDidMount() {
		this.noheroStyling();

		window.addEventListener('resize', () => {
			this.noheroStyling();
		});
	}

	screensize = () => {
		const view = window.innerWidth;
		return view < 1200 ? true : false;
	};

	noheroStyling = () => {
		const shortlHero = this.screensize();
		let heroHeight;

		heroHeight = shortlHero ? window.innerHeight * 0.25 : window.innerHeight * 0.35;

		window.addEventListener('scroll', () => {
			let fromTop = window.scrollY;

			fromTop >= heroHeight
				? this.nav.current.classList.add('navbar--nohero')
				: this.nav.current.classList.remove('navbar--nohero');
		});
	};

	render() {
		return <NavigationMenu nav={this.nav} />;
	}
}

export default Navigation;
