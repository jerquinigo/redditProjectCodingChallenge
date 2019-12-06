import React from "react";
import "./CSS/DisplayResults.css";
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
							<div className="display-override">
						<span>Date Created: {props.timeConverter(el.data.created)}</span>

							<span>Subreddit: {el.data.subreddit_name_prefixed}</span>

							<span>Score: {el.data.score}</span>

							<span>Ups: {el.data.ups}</span>

							<span>Comments: {el.data.num_comments}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});
};

export default DisplayResults;
