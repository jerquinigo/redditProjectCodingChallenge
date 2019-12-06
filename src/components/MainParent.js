import React, { Component } from "react";
import DisplayResults from "./DisplayResults.js";
import SelectOptions from "./SelectOptions.js";
import FilterOptions from "./FilterOptions.js";
import axios from "axios";
import _ from "lodash";

class MainParent extends Component {
	constructor() {
		super();
		this.state = {
			resData: "",
			subReddit: "",
			searchSubReddit: "r/all",
			filterOptions: "score",
			orderBy: "ascending",
			radio1Checked: true,
			radio2Checked: false,
			hide18Posts: false
		};
	}

	componentDidMount() {
		this.getAllReddit();
	}

	getAllReddit = () => {
		axios
			.get(
				`https://www.reddit.com/${this.state.searchSubReddit}/.json?limit=100`
			)
			.then(res => {
				let newArr = res.data.data.children.map(el => {
					return el.data.subreddit_name_prefixed;
				});
				this.setState({
					resData: res.data.data.children,
					subReddit: newArr
				});
			});
	};

	handleSelectChange = async e => {
		await this.setState({
			searchSubReddit: e.target.value
		});

		let res = await axios.get(
			`https://www.reddit.com/${this.state.searchSubReddit}/.json?limit=100`
		);
		this.setState({
			resData: res.data.data.children
		});
	};

	handleAscDescChange = e => {
		this.setState({
			orderBy: e.target.value,
			radio1Checked: !this.state.radio1Checked,
			radio2Checked: !this.state.radio2Checked
		});
	};

	handle18PlusContent = async e => {
		await this.setState({
			hide18Posts: !this.state.hide18Posts
		});
		let filterPostLodash;
		if (this.state.hide18Posts === false) {
			filterPostLodash = await _.filter(this.state.resData, res => {
				if (res.data.over_18 === true) {
					return res;
				} else {
					return null;
				}
			});
			let newArr;

			newArr = await filterPostLodash.map(el => {
				return el.data.subreddit_name_prefixed;
			});
			console.log(newArr, "newArr");
			this.setState({
				resData: filterPostLodash,
				searchSubReddit: newArr
			});
		}
	};

	handleFilterOptionChange = async e => {
		await this.setState({
			filterOptions: e.target.value
		});

		const { filterOptions, orderBy, resData } = this.state;

		if (filterOptions === "score" && orderBy === "ascending") {
			let scoreLodash = await _.sortBy(resData, res => res.data.score);
			this.setState({
				resData: scoreLodash
			});
		} else if (filterOptions === "num_comments" && orderBy === "ascending") {
			let commentsLodash = await _.sortBy(resData, res => res.data.num_comments);
			this.setState({
				resData: commentsLodash
			});
		} else if (filterOptions === "ups" && orderBy === "ascending") {
			let upsLodash = await _.sortBy(resData, res => res.data.ups);
			this.setState({
				resData: upsLodash
			});
		} else if (filterOptions === "score" && orderBy === "descending") {
			let scoreLodash = await _.orderBy(resData, res => res.data.ups).reverse();
			this.setState({
				resData: scoreLodash
			});
		} else if (filterOptions === "num_comments" && orderBy === "descending") {
			let commentsLodash = await _.orderBy(
				resData,
				res => res.data.num_comments
			).reverse();
			this.setState({
				resData: commentsLodash
			});
		} else if (filterOptions === "ups" && orderBy === "descending") {
			let upsLodash = await _.orderBy(resData, res => res.data.ups).reverse();
			this.setState({
				resData: upsLodash
			});
		}
	};

	timeConverter = UNIX_timestamp => {
		const a = new Date(UNIX_timestamp * 1000);
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		const year = a.getFullYear();
		const month = months[a.getMonth()];
		const date = a.getDate();
		const hour = a.getHours();
		const min = a.getMinutes();
		const time = month + " " + date + " " + year + " " + hour + ":" + min;
		return time;
	};

	render() {
		return (
			<div className="container ">
				<div className="row">
					<div className="col s2 m2" />
					<div className="col s8 m8">
						<span>Select Subreddit</span>
						<select
							className="browser-default"
							onChange={this.handleSelectChange}>
							<option value="r/all">r/all</option>
							<SelectOptions subReddit={this.state.subReddit} />
						</select>
					</div>
					<div className="col s2 m2" />
				</div>

				<FilterOptions
					handleFilterOptionChange={this.handleFilterOptionChange}
					handleAscDescChange={this.handleAscDescChange}
					radio1Checked={this.state.radio1Checked}
					radio2Checked={this.state.radio2Checked}
					handleRadioButtonCheck={this.handleRadioButtonCheck}
					handle18PlusContent={this.handle18PlusContent}
					hide18Posts={this.state.hide18Posts}
				/>

				<DisplayResults
					resData={this.state.resData}
					timeConverter={this.timeConverter}
				/>
			</div>
		);
	}
}

export default MainParent;
