import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import { useState } from "react"

function App() {
  const [showQuestions, setShowQuestions] = useState(true)
  const [loading, setLoading] = useState(false)

  function toggleShowQuestions() {
    setShowQuestions(showQuestions => !showQuestions)
  }
  function toggleLoading() {
    setLoading(loading => !loading)
  }

  return (
    <div className="container flex">
      { (showQuestions || loading) && <Header /> }
      <Main 
        showQuestions={showQuestions} 
        toggleShowQuestions={toggleShowQuestions}
        loading={loading}
        toggleLoading={toggleLoading}
      />
    </div>
  )
}

export default App
