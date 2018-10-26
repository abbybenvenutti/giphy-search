import React from 'react';
import Gif from './Gif';

const GifList = (props) => {
	const results = props.gifs;

	let gifs;
	if (results.length > 0) {
		gifs = results.map((gif) => <Gif url={gif.images.fixed_height.url} key={gif.id} />);
	} else {
		return <h3> "Sorry, no results. Please enter a new search query" </h3>;
	}

	return <ul>{gifs}</ul>;
};

export default GifList;
