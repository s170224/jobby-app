import './index.css'

const Skills = props => {
  const {skill1} = props
  //   const {image_url, name} = skill1

  return (
    <div>
      <p>{skill1.name}</p>
      <img src={skill1.image_url} />
    </div>
  )
}

export default Skills
