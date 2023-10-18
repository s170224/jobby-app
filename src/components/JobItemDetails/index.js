import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'
import {Link} from 'react-router-dom'

import './index.css'

const JobItemDetails = props => {
  const {eachJobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = eachJobDetails

  return (
    <li className="li-container">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="container1">
          <img src={companyLogoUrl} alt={title} className="companyImg" />
          <div className="con">
            <h1 className="headingtitle">{title}</h1>
            {/* <div className="ratingCon"> */}
            {/* <AiOutlineStar /> */}
            <p>
              {' '}
              <BsFillStarFill /> {rating}
            </p>
            {/* </div> */}
          </div>
        </div>
        <div className="locationContainer">
          <div>
            <p>
              <MdLocationOn /> {location}
            </p>
          </div>
          <div className="jobCon1">
            <p>
              <CgToolbox />
              {employmentType}
            </p>
          </div>
          <p className="pacPara">{packagePerAnnum}</p>
        </div>

        <div>
          <hr />
          <h1 className="headingtitle">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobItemDetails
