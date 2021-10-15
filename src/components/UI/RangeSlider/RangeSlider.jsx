import React from 'react';
import classes from './RangeSlider.module.css';

const RangeSlider = ({value, changeValueHandler, min, max}) => {
	return (
		<div className={classes.slider}>
			<div><span>{min}°С</span>
				<input
					type="range"
					value={value}
					min={min}
					max={max}
					onChange={(event) => changeValueHandler(event.target.value)}/>
				<span>{max}°С</span></div>
			<div className={classes.current}>Background temperature: {(+value).toFixed()}°С</div>
		</div>
	);
};

export default RangeSlider;