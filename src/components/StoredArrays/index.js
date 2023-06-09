import './index.css'

const StoredArrays = props => {
  const {Details} = props
  const {Format1, text} = Details
  console.log(text)

  return (
    <li className="list2-container">
      <p className="para-style">{Format1}</p>
      <p className="para-style-color">{text}</p>
    </li>
  )
}
export default StoredArrays
