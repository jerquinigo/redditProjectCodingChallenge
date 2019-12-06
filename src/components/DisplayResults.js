import React from "react";

const DisplayResults = props => {
	const { resData } = props;
	if (resData === "") return null;
	const styles = {
		width: "100%"
	};

	return resData.map(el => {
		debugger
		return (
			<div class="row">
				<div className="col s1 m1"/>
				<div class="col s10 m10">
					<div class="card">
						<div class="card-image">
							<img src={el.data.url} alt=" " />
							</div>
							<span class="card-title">{el.data.title}</span>
						
						<div class="card-content">
							<span>{props.timeConverter(el.data.created)}</span>
							<br />
							<span>Subreddit: {el.data.subreddit_name_prefixed}</span>
							<br />
							<span>score: {el.data.score}</span>
							<br />
							<span>ups: {el.data.ups}</span>
							<br />
							<span>comments: {el.data.num_comments}</span>
						</div>
					</div>
				</div>
				<div className="col s1 m1"/>
			</div>
		);
	});

};

export default DisplayResults;

// <div class="row">
// <div class="col s12 m6">
//   <div class="card">
// 	<div class="card-image">
// 	  <img src={el.data.url} alt="" />
// 	  <span class="card-title">{el.data.title}</span>
// 	</div>
// 	<div class="card-content">
// 	<span>{props.timeConverter(el.data.created)}</span>
// 					<br />
// 					<span>Subreddit: {el.data.subreddit_name_prefixed}</span>
// 					<br />
// 					<span>score: {el.data.score}</span>
// 					<br />
// 					<span>ups: {el.data.ups}</span>
// 					<br />
// 					<span>comments: {el.data.num_comments}</span>
// 	</div>
//   </div>
// </div>
// </div>
