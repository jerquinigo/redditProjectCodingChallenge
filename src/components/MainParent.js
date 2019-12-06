import React, { Component } from "react";
import DisplayResults from "./DisplayResults.js";
import SelectOptions from "./SelectOptions.js";
import FilterOptions from "./FilterOptions.js"
import axios from "axios";
import _ from 'lodash';

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
		// $(document).ready(function() {
		// 	debugger
		// 	$('select').formSelect();
		// });
		 //var elems = document.querySelectorAll('select');
		 // var options = document.querySelectorAll('option');
		// var radio = document.querySelectorAll('input')

		// var instances = M.FormSelect.init(elems, options); 
		// var elems = document.getElementsByTagName("select");
		// var instances = M.select.init(elems);
		//M.AutoInit()
		//var elems = document.querySelectorAll('select');
		//var instances = M.FormSelect.init(elems, {dropdownOptions: this.state.resData});
	

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


	handleAscDescChange = (e) => {
		this.setState({
			orderBy: e.target.value,
			radio1Checked: !this.state.radio1Checked,
			radio2Checked: !this.state.radio2Checked
		})
	}

	handle18PlusContent = async (e) => {
		 await this.setState({
			hide18Posts: !this.state.hide18Posts
		})
		let filterPostLodash 
		if(this.state.hide18Posts === false){
			filterPostLodash = await _.filter(this.state.resData, res => {
				if(res.data.over_18 === true){
					return res
				}else{
					return null
				}
			})
			let newArr
			
			 newArr = await filterPostLodash.map(el => {
				return el.data.subreddit_name_prefixed;
			})
	console.log(newArr, "newArr")
			this.setState({
				resData: filterPostLodash,
				searchSubReddit: newArr
			})
		}
	}

	handleFilterOptionChange = async e => {
		 await this.setState({
			filterOptions: e.target.value
		})

		const {filterOptions, orderBy, resData} = this.state

		if(filterOptions === "score" && orderBy === "ascending"){
			let scoreLodash = await _.sortBy(resData, res => res.data.score)
			this.setState({
				resData: scoreLodash
			})
		}
		else if(filterOptions === "num_comments" && orderBy === "ascending"){
			let scoreLodash = await _.sortBy(resData, res => res.data.num_comments)
			this.setState({
				resData: scoreLodash
			})
		}
		else if(filterOptions === "ups" && orderBy === "ascending"){
			let scoreLodash = await _.sortBy(resData, res => res.data.ups)
			this.setState({
				resData: scoreLodash
			})
		}
		else if(filterOptions === "score" && orderBy === "descending"){
			let scoreLodash = await _.orderBy(resData, res => res.data.ups).reverse()
			this.setState({
				resData: scoreLodash
			})
		}

		else if(filterOptions === "num_comments" && orderBy === "descending"){
			let scoreLodash = await _.orderBy(resData, res => res.data.num_comments).reverse()
			this.setState({
				resData: scoreLodash
			})
		}

		else if(filterOptions === "ups" && orderBy === "descending"){
			let scoreLodash = await _.orderBy(resData, res => res.data.ups).reverse()
			this.setState({
				resData: scoreLodash
			})
		}
	}




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
		console.log(this.state.orderBy)
		return (
			<div className="container ">
				<div className="row">
					<div className="col s4 m4"/>
				<div className="col s4 m4">
				<select className="browser-default" onChange={this.handleSelectChange}>
					<option value="r/all">r/all</option>
					<SelectOptions subReddit={this.state.subReddit} />
				</select>
				</div>
				<div className="col s4 m4"/>
				</div>

				<FilterOptions handleFilterOptionChange={this.handleFilterOptionChange} handleAscDescChange={this.handleAscDescChange} radio1Checked={this.state.radio1Checked} radio2Checked={this.state.radio2Checked} handleRadioButtonCheck={this.handleRadioButtonCheck} handle18PlusContent={this.handle18PlusContent} hide18Posts={this.state.hide18Posts}/>

				<DisplayResults
					resData={this.state.resData}
					timeConverter={this.timeConverter}
				/>
				
				  <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
					
			</div>
		);
	}
}

export default MainParent;
