import React from "react"


const SelectOptions = (props) => {
    const { subReddit } = props;
    if(subReddit === "") return null
    return subReddit.map(subs => {
        return <option value={subs}>{subs}</option>;
    })
}




export default SelectOptions