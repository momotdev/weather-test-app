import React, {useState} from 'react';
import classes from './SearchPanel.module.css';

const SearchPanel = ({updateSearch}) => {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<form className={classes['search-form']}>
			<input type="text" placeholder="Enter the city name..." value={searchQuery} onChange={event => setSearchQuery(event.target.value)}/>
			<button onClick={event => {
				event.preventDefault();
				updateSearch(searchQuery);
			}}>Search</button>
		</form>
	);
};

export default SearchPanel;