import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'
import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarProducts from '../SimilarProducts'

import Skills from '../Skills'

import './index.css'

const jobsViewFilter = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class JobViewDetails extends Component {
  state = {
    jobData: {},
    similarJobsList: [],
    apiStatus: jobsViewFilter.initial,
  }

  componentDidMount() {
    this.getJobView()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skillsImageUrl: data.skills,

    lifeAtCompany: data.life_at_company,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
  })

  getJobView = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: jobsViewFilter.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // const data = await response.json()

    if (response.ok === true) {
      const jobsData = await response.json()
      console.log(jobsData)

      const updatedJobs = this.getFormattedData(jobsData.job_details)

      const updatedSimilarData = jobsData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        id: eachItem.id,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobData: updatedJobs,
        similarJobsList: updatedSimilarData,
        apiStatus: jobsViewFilter.success,
      })
    } else {
      this.setState({apiStatus: jobsViewFilter.failure})
    }
  }

  skillsFunction = () => {
    const {jobData} = this.state
    if (jobData.skillsImageUrl === undefined) {
      return null
    }
    return (
      <div>
        <ul className="skilCon">
          {jobData.skillsImageUrl.map(eachSkill => (
            <li className="skillsList">
              <img
                src={eachSkill.image_url}
                alt={eachSkill.name}
                className="imag12"
              />

              <p>{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobData, similarJobsList} = this.state
    // console.log('sjsjs', jobData.lifeAtCompany.description)

    return (
      <div className="mainContainerJobs1">
        <Header />

        <div className="sub-conLis">
          <div className="container1">
            <img
              src={jobData.companyLogoUrl}
              alt={jobData.employmentType}
              className="companyImg"
            />
            <div className="con">
              <h1 className="headingtitle">{jobData.employmentType}</h1>
              {/* <div className="ratingCon"> */}
              {/* <AiOutlineStar /> */}
              <p>
                {' '}
                <BsFillStarFill /> {jobData.rating}
              </p>
              {/* </div> */}
            </div>
          </div>
          <div className="locationContainer">
            <div>
              <p>
                <MdLocationOn /> {jobData.location}
              </p>
            </div>
            <div className="jobCon1">
              <p>
                <CgToolbox />
                {jobData.employmentType}
              </p>
            </div>
            <p className="pacPara">{jobData.packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1 className="headingtitle">Description</h1>
            <p>{jobData.jobDescription}</p>
          </div>
          <h1>Skills</h1>
          {this.skillsFunction()}
        </div>

        <h1 className="simHead">Similar Jobs</h1>
        <ul className="similarJobsContainer">
          {similarJobsList.map(eachItem1 => (
            <SimilarProducts key={eachItem1.id} eachSimilarJob={eachItem1} />
          ))}
        </ul>
      </div>
    )
  }

  retryButton = () => {
    this.setState(
      {apiStatus: jobsViewFilter.in_progress},
      this.getJobItemDetails,
    )
  }

  renderFailureview1 = () => (
    <>
      <Header />
      <div className="jobs_container">
        <div className="text-light w-100 d-flex flex-column justify-content-center align-items-center mt-4 mb-5">
          <img
            className="w-50"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1 className="mt-2">Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button className="button11" type="button" onClick={this.retryButton}>
            Retry
          </button>
        </div>
      </div>
    </>
  )

  loadingView = () => (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="loader-container">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  switchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobsViewFilter.success:
        return this.renderSuccessView()
      case jobsViewFilter.failure:
        return this.renderFailureview1()
      case jobsViewFilter.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {jobData, similarJobsList} = this.state
    console.log(jobData)
    console.log(similarJobsList)
    return <div>{this.switchCase()}</div>
  }
}

export default JobViewDetails
