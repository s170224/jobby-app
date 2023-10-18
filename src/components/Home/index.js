import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const findJobFunction = () => {
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="mainContainer">
        <h1>Find The Job That Fits Your Life </h1>
        <p>Millions of people are searching for jobs</p>
        <button className="button12" onClick={findJobFunction}>
          Find Jobs
        </button>
      </div>
    </>
  )
}

export default Home
