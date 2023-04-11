import React, { useState } from "react"
import Die from "./Die"
import { useEffect } from "react"
import Confetti from "react-confetti"


export default function App() {


  const [dice, setDice] = useState(newDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)



  useEffect(() => {
    const winNumber = dice[0].number
    if (dice.every(die => die.isHeld && die.number === winNumber)) {
      setTenzies(true)
      console.log("You won!")
    }
    else{ setTenzies(false) }
  }, [dice])


  function newDie() {
    return {
      number: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }
  }


  function newDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(newDie())
    }
    return diceArray
    // console.log(diceArray)
  }


  function rollDice() {
    setRolls(rolls + 1)
    setDice(dice.map(die => {
      return die.isHeld ?      //if current die is held,
        die :                    //return same die (same number)
        newDie()  //else return new die
    }))
  }


  function holdDice(index) {
    dice[index].isHeld = !dice[index].isHeld
    setDice([...dice])
  }


  function newGame(){
    setRolls(0)
    setDice(newDice())
  }
  // function hello(){
  //   console.log("hello")
  // }


  const diceElements = dice.map((die, index) => {
    return <Die number={die.number}
      isHeld={die.isHeld}
      holdDice={() => holdDice(index)}
      key={index} />
  })



  return (

    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">
        {diceElements}
      </div>
      { !tenzies ? 
      <button className="roll-btn" onClick={rollDice}>Roll</button> : 
      <button className="roll-btn" onClick={newGame}>New Game</button>
      }
      {tenzies && <b class="rolls">You rolled dice for {rolls} times</b>}
      

    </main>

  )
}
