import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import UserProfile from '../UserProfile'

import JobItemDetails from '../JobItemDetails'

import './index.css'
// import {async} from 'fast-glob'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const jobsFilter = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileUser: [],
    jobsList: [],
    apiStatus: jobsFilter.initial,
    searchInput: '',
    activeRating: '',
    checkboxInput: '',
    checkBoxList: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    // this.setState({apiStatus: jobsFilter.in_progress})
    const {
      activeEmployeementID,
      activeRating,
      searchInput,
      checkboxInput,
      checkBoxList,
    } = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxList.join(
      ',',
    )}&minimum_package=${activeRating}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsList = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobsList: updatedJobsList, apiStatus: jobsFilter.success})
    } else {
      this.setState({apiStatus: jobsFilter.failure})
    }
  }

  changeCheckBox = e => {
    const {checkboxInput, checkBoxList} = this.state
    const noItemList = checkBoxList.filter(each => each === e.target.id)
    console.log('nooo item---', noItemList)
    console.log('length', noItemList.length)
    if (noItemList.length === 0) {
      this.setState(
        prevState => ({
          checkBoxList: [...prevState.checkBoxList, e.target.id],
        }),
        this.getJobDetails,
      )
    } else {
      const newUpdate = checkBoxList.filter(e1 => e1 !== e.target.id)
      this.setState({checkBoxList: newUpdate}, this.getJobDetails)
    }
  }

  changeRating = e => {
    this.setState({activeRating: e.target.id}, this.getJobDetails)
  }

  searchFunction = event => {
    this.setState({searchInput: event.target.value})
  }

  changeButtonFunction = () => {
    this.getJobDetails()
    console.log('clikdbutton')
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#b6c5ff" height="50" width="50" />
    </div>
  )

  retryButton1 = () => {
    this.setState({status: jobsFilter.inProgress}, this.getJobDetails)
    console.log('progess')
  }

  failureView = () => {
    const {apiStatus} = this.state
    return (
      <div>
        <div className="user_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
            alt="failure view"
          />
          <h1>Oops! Something went wrong</h1>
          <p>we connect the page to some thinsg</p>
          <button
            type="button"
            className="button11"
            onClick={this.retryButton1}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  searchFunctionView = () => {
    const {searchInput} = this.state

    return (
      <form className="form-inline">
        <div className="input-group w-50">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={searchInput}
            onChange={this.searchFunction}
          />
          <div className="input-group-prepend search_box">
            <button
              type="button"
              onClick={this.changeButtonFunction}
              //   testid="searchButton"
              className="input-group-text border"
            >
              <BsSearch className="search-icon " />
            </button>
          </div>
        </div>
      </form>
    )
  }

  successView = () => {
    const {
      jobsList,
      profileUser,
      searchInput,
      activeEmployeementID,
      activeRating,
      checkboxInput,
      checkBoxList,
      newCheckBoxList,
    } = this.state

    const newList = jobsList.filter(eachList =>
      eachList.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const showJobsList = newList.length > 0

    return (
      <>
        <Header />

        <div className="mainContainerJobs">
          <div className="userCon">
            <UserProfile />

            <div className="con">
              <div className="hr-con1">
                <hr />
              </div>
              <h1 className="headsal">Types of Employment</h1>

              <ul>
                {employmentTypesList.map(eachItem => (
                  <li key={eachItem.employmentTypeId} className="salaryList1">
                    <input
                      type="checkbox"
                      id={eachItem.employmentTypeId}
                      onChange={this.changeCheckBox}
                      //   value={eachItem.employmentTypeId}
                    />
                    <label htmlFor={eachItem.label}>
                      {eachItem.employmentTypeId}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="con">
              <div className="hr-con1">
                <hr />
              </div>
              <h1 className="headsal">Salary Range</h1>
              <ul>
                {salaryRangesList.map(each1 => (
                  <li key={each1.salaryRangeId} className="salaryList1">
                    <input
                      type="radio"
                      id={each1.salaryRangeId}
                      //   value={each1.label}
                      name="option"
                      onChange={this.changeRating}
                      //   checked
                    />
                    <label htmlFor={each1.salaryRangeId}>{each1.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="jobsinputContainer">
            <form>
              <div className="inputContainer">
                <input
                  type="search"
                  placeholder="Search"
                  className="input12"
                  onChange={this.searchFunction}
                  value={searchInput}
                />
                <button
                  type="button"
                  onClick={this.changeButtonFunction}
                  className="btn124"
                >
                  <BsSearch />
                </button>
              </div>
            </form>
            {showJobsList ? (
              <ul>
                {newList.map(eachJob => (
                  <JobItemDetails key={eachJob.id} eachJobDetails={eachJob} />
                ))}
              </ul>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                />
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  renderJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobsFilter.success:
        return this.successView()
      case jobsFilter.in_progress:
        return this.renderLoadingView()
      case jobsFilter.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state

    return <div>{this.renderJobsView()}</div>
  }
}

export default Jobs
