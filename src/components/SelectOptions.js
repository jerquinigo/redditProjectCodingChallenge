import React from "react";

const SelectOptions = props => {
	const { subReddit } = props;
	if (subReddit === "") return null;
	return subReddit.map((subs, i) => {
		return (
			<option key={i} value={subs}>
				{subs}
			</option>
		);
	});
};

export default SelectOptions;
