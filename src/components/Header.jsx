import popChoiceLogoUrl from '../assets/pop-choice-logo.png'

export default function Header() {
  return (
    <div className="header-container flex">
      <img src={popChoiceLogoUrl} alt="Pop Choice Logo" className='logo-img'/>
      <span className='logo-text'>PopChoice</span>
    </div>
  )
} 