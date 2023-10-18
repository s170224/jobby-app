import {Link, withRouter} from 'react-router-dom'
import './index.css'

import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props

  const onLogOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="con1">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="imageLogo"
        />
      </Link>
      <ul className="container1">
        <li className="liCon">
          <Link to="/" className="nav-items">
            <p>Home </p>
          </Link>
        </li>
        <li className="liCon1">
          <Link to="/jobs" className="nav-items">
            Jobs
          </Link>
        </li>
      </ul>

      <div>
        <button type="button" className="button1" onClick={onLogOut}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
