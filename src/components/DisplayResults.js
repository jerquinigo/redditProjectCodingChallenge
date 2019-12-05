import React from "react"

const DisplayResults = (props) => {

		const { resData } = props;
    if(resData === "") return null
    
        // if(resData.length){

		return resData.map(el => {
        
			return (
				<div>
					<img src={el.data.url} alt="" />
					<span>{el.data.title}</span>
					<br />
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
			);
        });
    // }else{
    //     return(
    //         <div>
    //             <span>nothing to present</span>
    //         </div>
    //     )
    // }
};    



export default DisplayResults
