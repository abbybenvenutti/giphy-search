import React, { Component } from 'React';
import axios from 'axios';
const giphyAPI = require('../../secrets');
import GifList from './GifList';

const giphyConfig =  process.env.SECRET_ID;

class Home extends Component {
	constructor() {
		super();
		this.state = {
			gifs: [],
			loading: true,
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
  }

	handleChange(evt) {
		this.setState({
			value: evt.target.value
		});
  }



	handleSubmit(evt) {
		evt.preventDefault();
		axios
			.get(`https://api.giphy.com/v1/gifs/search?q=${this.state.value}&api_key=${giphyConfig}&limit=10`)
			.then((response) => {
				this.setState({
					gifs: response.data.data,
					loading: false,
					value: ''
				});
			})
			.catch((error) => {
				console.log('Error fetching and parsing data', error);
			});
	}

	handleClick() {
		axios
			.get(`https://api.giphy.com/v1/gifs/trending?api_key=${giphyConfig}&limit=10`)
			.then((response) => {
				this.setState({
					gifs: response.data.data,
					loading: false
				});
			})
			.catch((error) => {
				console.log('Error fetching and parsing data', error);
			});
	}

	render() {
		return (
			<div className="container">
				<span>
					<h1>Giphy Search</h1>
				</span>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							value={this.state.value}
							onChange={this.handleChange}
							placeholder="Enter search query"
						/>
						<input type="submit" value="Submit" /> {'\n'}
						<button type="button" onClick={this.handleClick}>
							See what's trending
						</button>
					</form>
				</div>
				<div className="items">{this.state.loading ? null : <GifList gifs={this.state.gifs} />}</div>
			</div>
		);
	}
}

export default Home;
