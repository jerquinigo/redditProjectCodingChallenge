import React from "react";
import "./CSS/FilterOptions.css";

const FilterOptions = ({
	handleFilterOptionChange,
	handleAscDescChange,
	radio1Checked,
	radio2Checked,
	handle18PlusContent,
	hide18Posts
}) => {
	return (
		<div>
			<div className="row">
				<div className="col s2 m2" />
				<div className="input-field col s8 m8">
					<span>Select Category To Filter By</span>
					<select
						className="browser-default"
						onChange={handleFilterOptionChange}
					>
						<option>Select Filter</option>
						<option value="score">score</option>
						<option value="num_comments">comments</option>
						<option value="ups">ups</option>
					</select>
				</div>
				<div className="col s2 m2" />
			</div>
			<div className="checkbox-radio-filter-div">
				<label>
					<input
						className="browser-default"
						onClick={handle18PlusContent}
						value={hide18Posts}
						type="checkbox"
					/>
					<span className="black-text">Hide 18+ Posts</span>
				</label>
				<br />
				<label>
					<input
						className="browser-default"
						onChange={handleAscDescChange}
						type="radio"
						name="group1"
						checked={radio1Checked}
						value="ascending"
					/>
					<span className="black-text">Ascending</span>
				</label>
				<br />
				<label>
					<input
						className="browser-default"
						onChange={handleAscDescChange}
						type="radio"
						name="group1"
						checked={radio2Checked}
						value="descending"
					/>
					<span className="black-text">Descending</span>
				</label>
			</div>
		</div>
	);
};

export default FilterOptions;
