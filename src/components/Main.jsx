import { useState } from "react"

export default function Main() {

  const [showQuestions, setShowQuestions] = useState(false)
  const [title, setTitle] = useState('School of Rock')
  const [releaseYear, setReleaseYear] = useState('2009')
  const [content, setContent] = useState('A fun and stupid movie about a wannabe rocker turned fraud substitute teacher forming a rock band with his students to win the Battle of the Bands')

  return (
    <div className="main-container flex">
      {showQuestions ?
        <div className="questions-container flex">
          <div className="question-container flex">
            <span className="question-text">What’s your favorite movie and why?</span>
            <textarea className="question-text-area" rows={3}></textarea>
          </div>
          <div className="question-container flex">
            <span className="question-text">Are you in the mood for something new or a classic?</span>
            <textarea className="question-text-area" rows={3}></textarea>
          </div>
          <div className="question-container flex">
            <span className="question-text">Do you wanna have fun or do you want something serious?</span>
            <textarea className="question-text-area" rows={3}></textarea>
          </div>
          <div className="btn-container">
            <button className="btn">Let's Go</button>
          </div>
        </div>
        : <div className="result-container flex">
          <div className="answer-container flex">
            <span className="result-title-release-year">{`${title} (${releaseYear})`}</span>
            <span className="result-content">{content}</span>
          </div>
          <div className="btn-container">
            <button className="btn">Go Again</button>
          </div>
        </div>
      }
    </div >
  )
} 