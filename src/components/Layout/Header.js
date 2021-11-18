import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = props => {
	return (
		<header className={classes.header}>
			<h1>E-COMMERCE</h1>
			<HeaderCartButton onClick={props.onShowCart} />
		</header>
	);
}

export default Header;