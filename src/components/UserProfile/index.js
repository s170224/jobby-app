import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const componentStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UserProfile extends Component {
  state = {userProfileDetails: [], status: componentStatus.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({status: componentStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      //   console.log('userProfile', response)
      const data = await response.json()
      //   console.log(data)
      const userProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({userProfileDetails, status: componentStatus.success})
    } else {
      this.setState({status: componentStatus.failure})
    }
  }

  successView = () => {
    const {userProfileDetails} = this.state
    const {name, profileImageUrl, shortBio} = userProfileDetails
    return (
      <div className="profile_container p-3">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="heading1">{name}</h1>
        <p className="para1">{shortBio}</p>
      </div>
    )
  }

  retryButton = () => {
    this.setState({status: componentStatus.inProgress}, this.getProfileDetails)
  }

  failureView = () => (
    <div className="user_container">
      <button className="button" type="button" onClick={this.retryButton}>
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="user_container d-flex justify-content-center align-items-center">
      <div className="loader-container">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  switchFunction = () => {
    const {status} = this.state

    switch (status) {
      case componentStatus.success:
        return this.successView()
      case componentStatus.failure:
        return this.failureView()
      case componentStatus.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.switchFunction()}</div>
  }
}

export default UserProfile
