import './App.css';
import { languages } from "./helper/language"
import { useState } from "react"
import { clsx } from "clsx"
import { getFarewellText } from "./helper/utils"
import { getRandomWord } from "./helper/words"
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

function App() {

  const [currentWord, setCurrentWord] = useState(getRandomWord)
  const { width, height } = useWindowSize()
  const [guessedLetters, setGuessedLetters] = useState([])
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


  const wrongGuessesCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessesCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessesCount
    const className = clsx("chip", isLanguageLost && "lost")
    const style = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
      <span className={className} style={style} key={lang.name}>{lang.name}</span>
    )
  })

  const word = [...currentWord].map((char, index) => {
    const revealLetter = isGameLost || guessedLetters.includes(char)
    const letterClassName = clsx({
      missed: isGameLost && !guessedLetters.includes(char)
    })
    return (
      <span key={index} className={letterClassName}>{revealLetter ? char.toUpperCase() : ""}</span>
    )
  })

  const keyboardElements = alphabets.split("").map(char => {
    const isGuessed = guessedLetters.includes(char)
    const isCorrect = isGuessed && currentWord.includes(char)
    const isWrong = isGuessed && !currentWord.includes(char)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button className={className}
        disabled={isGameOver ? true : false}
        key={char}
        onClick={() => handleOnClick(char)}>
        {char}
      </button>
    )
  })

  function handleOnClick(letter) {
    setGuessedLetters(guessedLetters =>
      !guessedLetters.includes(letter) ? [...guessedLetters, letter] : guessedLetters
    )
  }

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  const gameStatus = isGameOver ? (
    isGameWon ? (
      <>
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </>
    ) : (
      <>
        <h2>Game over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </>
    )
  ) : (
    <p>{isLastGuessIncorrect && getFarewellText(languages[wrongGuessesCount - 1].name)}</p>
  )

  function startNewGame() {
    setCurrentWord(getRandomWord)
    setGuessedLetters([])
  }

  return (
    <main>
      <header>
        <h1>Assembly:Endgame</h1>
        <p>Guess the word in under {8 - wrongGuessesCount} attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}>
        {gameStatus}
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
      {
        isGameOver && (
          <>
            {isGameWon && <Confetti width={width}
              height={height}
              recycle={false}
              numberOfPieces={1000} />}
            <button onClick={startNewGame} className='new-game'>New Game</button>
          </>)
      }
    </main>
  );
}

export default App;
