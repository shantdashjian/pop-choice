import { openai, supabase } from './config.js'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'

function App() {

  return (
    <div className="container flex">
      <Header />
      <Main />
    </div>
  )
}

export default App
