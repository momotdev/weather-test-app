import React from 'react';
import classes from './Loader.module.css';

const Loader = ({title}) => {
	return (
		<div className={classes.loader}>
			<div className={classes['loader-title']}>{title}</div>
			<div className={classes['loader-figure']}>
			</div>
		</div>

	);
};

export default Loader;