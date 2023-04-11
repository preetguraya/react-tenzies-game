import React from "react"

export default function Die(props){


return(
    <div className={`die ${ props.isHeld && "held" } die${props.number}`} onClick={props.holdDice}>
        {/* <span>{props.number}</span> */}
    </div>
)
}