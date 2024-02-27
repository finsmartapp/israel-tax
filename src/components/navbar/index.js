import React, { Component } from 'react';
import './navbar.scss';
import NavigationMenu from './NavbarMenus';

class Navigation extends Component {
	constructor() {
		super();
		this.nav = React.createRef();
	}

	componentDidMount() {
		this.heroOutOfView();

		window.addEventListener('resize', () => {
			this.heroOutOfView();
		});
	}

	screensize = () => {
		const view = window.innerWidth;
		return view < 1400 ? true : false; //Must match hero.scss
	};

	heroOutOfView = () => {
		const smallHero = this.screensize();
		let heroHeight;

		heroHeight = smallHero ? window.innerHeight * 0.3 : window.innerHeight * 0.45; //Must match hero.scss

		window.addEventListener('scroll', () => {
			let fromTop = window.scrollY;

			fromTop >= heroHeight
				? this.nav.current.classList.add('navbar--heroscroll')
				: this.nav.current.classList.remove('navbar--heroscroll');
		});
	};

	render() {
		return <NavigationMenu nav={this.nav} />;
	}
}

export default Navigation;
