import { openai, supabase } from "../config"
import { useState } from "react"
import loadingUrl from '../assets/loading.gif'
import movieDbLogoUrl from '../assets/the-movie-db-logo.svg'

export default function Main() {

  const [showQuestions, setShowQuestions] = useState(true)
  const [loading, setLoading] = useState(false)
  const [firstAnswer, setFirstAnswer] = useState('')
  const [secondAnswer, setSecondAnswer] = useState('')
  const [thirdAnswer, setThirdAnswer] = useState('')
  const [title, setTitle] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [content, setContent] = useState('')
  const [posterUrl, setPosterUrl] = useState('')

  function handleFirstAnswer(e) {
    setFirstAnswer(e.target.value)
  }
  function handleSecondAnswer(e) {
    setSecondAnswer(e.target.value)
  }
  function handleThirdAnswer(e) {
    setThirdAnswer(e.target.value)
  }
  async function handleLetsGo(e) {
    const input = `${firstAnswer} ${secondAnswer} ${thirdAnswer}`
    setShowQuestions(false)
    setLoading(true)
    setFirstAnswer('')
    setSecondAnswer('')
    setThirdAnswer('')
    const embeddingRaw = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: input,
      encoding_format: "float",
    })
    const embedding = embeddingRaw.data[0].embedding
    let { data } = await supabase
      .rpc('match_movies', {
        match_count: 1,
        match_threshold: 0.7,
        query_embedding: embedding
      })
    let { title, release_year, content } = data[0]
    const messages = [
      {
        role: 'system',
        content: 'You are a movie expert. You will be given a text that begins with a movie title, its duration, a synopsis, and the rating. Respond with an enthusiastic recommendation to watch the movie. Keep your answer to 25 words.'
      },
      {
        role: 'user',
        content: content
      }
    ]
    let response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages
    })
    setTitle(title)
    setReleaseYear(release_year)
    setContent(response.choices[0].message.content)

    const movieDbApiKey = import.meta.env.VITE_MOVIE_DB_API_KEY
    const posterResponse =
      await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${movieDbApiKey}`)
    const posterData = await posterResponse.json()
    const posterPath = posterData.results[0].poster_path
    const posterUrl = `https://image.tmdb.org/t/p/original${posterPath}`
    setPosterUrl(posterUrl)
    setLoading(false)
  }

  function handleGoAgain(e) {
    setShowQuestions(true)
  }

  return (
    <div className="main-container flex">
      {showQuestions &&
        <div className="questions-container flex">
          <div className="question-container flex">
            <span className="question-text">What’s your favorite movie and why?</span>
            <textarea className="question-text-area" rows={3} value={firstAnswer} onChange={handleFirstAnswer} placeholder="My favorite movie is Terminator."></textarea>
          </div>
          <div className="question-container flex">
            <span className="question-text">Are you in the mood for something new or a classic?</span>
            <textarea className="question-text-area" rows={3} value={secondAnswer} onChange={handleSecondAnswer} placeholder="I'm in the modd for something classic."></textarea>
          </div>
          <div className="question-container flex">
            <span className="question-text">Do you wanna have fun or do you want something serious?</span>
            <textarea className="question-text-area" rows={3} value={thirdAnswer} onChange={handleThirdAnswer} placeholder="I want something serious."></textarea>
          </div>
          <div className="btn-container">
            <button className="btn" onClick={handleLetsGo}>Let's Go</button>
          </div>
        </div>
      }
      {loading &&
        <div className='loading-img-container flex'>
          <img className='loading-img' src={loadingUrl} />
        </div>
      }
      {!showQuestions && !loading &&
        <div className="result-container flex">
          <div className="answer-container flex">
            <span className="result-title-release-year">{`${title} (${releaseYear})`}</span>
            <img className="poster-img" src={posterUrl} alt={title} />
            <img className="movie-db-logo-img" src={movieDbLogoUrl} alt="The Movie DB Logo" />
            <span className="result-content">{content}</span>
          </div>
          <div className="btn-container">
            <button className="btn" onClick={handleGoAgain}>Go Again</button>
          </div>
        </div>
      }
    </div >
  )
} 