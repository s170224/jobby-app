import {BsFillStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {CgToolbox} from 'react-icons/cg'
import './index.css'

const SimilarProducts = props => {
  const {eachSimilarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    title,
  } = eachSimilarJob

  return (
    <li className="li-container">
      <div className="subcon1">
        <img src={companyLogoUrl} alt={title} className="companyImg" />
        <div className="con">
          <h1 className="headingtitle">{employmentType}</h1>
          {/* <div className="ratingCon"> */}
          {/* <AiOutlineStar /> */}
          <p>
            <BsFillStarFill /> {rating}
          </p>
          {/* </div> */}
        </div>
      </div>

      <div>
        <h1 className="headingtitle">Description</h1>
        <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarProducts
