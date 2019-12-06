import React from "react";

const DisplayResults = props => {
	const { resData } = props;
	if (resData === "") return null;
	
	return resData.map((el, i) => {
		return (
			<div key={i} className="row">
				<div className="col s1 m1" />
				<div className="col s10 m10">
					<div className="card">
						<div className="card-image">
							<img src={el.data.url} alt=" " />
						</div>
						<span className="card-title">{el.data.title}</span>

						<div className="card-content">
							<span>Date Created: {props.timeConverter(el.data.created)}</span>
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
				<div className="col s1 m1" />
			</div>
		);
	});
};

export default DisplayResults;
