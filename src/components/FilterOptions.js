import React from "react";

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
                <div className="col s2 m2"/>
			<div className="input-field col s8 m8">
				<select className="browser-default" onChange={handleFilterOptionChange}>
					<option>Select Filter</option>
					<option value="score">score</option>
					<option value="num_comments">comments</option>
					<option value="ups">ups</option>
				</select>
			</div>
                <div className="col s2 m2"/>
            </div>

			<label>
				<input
					className="browser-default"
					onClick={handle18PlusContent}
					value={hide18Posts}
					type="checkbox"
				/>
				<span>hide 18 posts</span>
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
				<span>ascending</span>
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
				<span>descending</span>
			</label>
		</div>
	);
};

export default FilterOptions;
