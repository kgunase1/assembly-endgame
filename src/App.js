import logo from './logo.svg';
import './App.css';
import { languages } from "./helper/language"
import { useState } from "react"
function App() {

  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
 
  const languageElements = languages.map(lang => {
    const style = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
      <span className="chip" style={style} key = {lang.name}>{lang.name}</span>
    )
  })

  const word = [...currentWord].map((char, index) => (
    <span key = {index}>{char.toUpperCase()}</span>
  ))

  const keyboardElements = [...alphabets].map(char => (
    <button className='keys' key = {char} onClick={() => handleOnClick(char)}>{char}</button>
  ))

  function handleOnClick(letter) {
    setGuessedLetters(guessedLetters => 
      !guessedLetters.includes(letter) ? [...guessedLetters, letter] : guessedLetters
    )
  }

  return (
    <main>
      <header>
        <h1>Assembly:Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className='game-status'>
        <h2>You Win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className='language-chips'>
        {languageElements}
      </section>
      <section className='word'>
        {word}
      </section>
      <section className='keyboard'> 
        {keyboardElements}
      </section>
      <button className='new-game'>New Game</button>
    </main>
  );
}

export default App;
