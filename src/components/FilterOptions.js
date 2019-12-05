import React from "react"


const FilterOptions = ({handleFilterOptionChange, handleAscDescChange, radio1Checked, radio2Checked, handle18PlusContent, hide18Posts}) => {
    return(
        <div>
           <select onChange={handleFilterOptionChange}>
               <option>Select Filter</option>
               <option value="score">score</option>
               <option value="num_comments">comments</option>
               <option value="ups">ups</option>
            </select> 

            <input onClick={handle18PlusContent} value={hide18Posts} type="checkbox" /> Hide 18+ Posts
            <br />
            <input onChange={handleAscDescChange} type="radio" name="group1" checked={radio1Checked} value="ascending"/> ascending
            <br />
            <input onChange={handleAscDescChange} type="radio" name="group1" checked={radio2Checked}  value="descending"/> desending
        </div>
    )
}


export default FilterOptions