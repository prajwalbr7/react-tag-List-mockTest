import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './App.css'
import StoredArrays from './components/StoredArrays'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    text: tagsList[0].displayText,
    inputText: '',
    StoredText1: [],
    activeTag: 'INITIAL',
  }

  InputText = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeOptionText = event => {
    this.setState({text: event.target.value})
  }

  SubmitForm = event => {
    event.preventDefault()
    const {text, inputText} = this.state
    const Format1 = inputText

    const id = uuid()
    if (Format1.length !== 0) {
      this.setState(prevState => ({
        StoredText1: [...prevState.StoredText1, {id, Format1, text}],
        inputText: '',
        text: tagsList[0].displayText,
      }))
    }
  }

  onClickFetched = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderListItem = Filtered => {
    const {StoredText1} = this.state
    const TaskList = StoredText1.length > 0
    return (
      <>
        {TaskList ? (
          <ul className="ul-style2">
            {Filtered.map(eachItem => (
              <StoredArrays Details={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          <p className="para-style-no-task">No Tasks Added Yet</p>
        )}
      </>
    )
  }

  render() {
    const {StoredText1, inputText, text, activeTag} = this.state

    console.log(activeTag)
    console.log(StoredText1)
    const Filtered =
      activeTag === 'INITIAL'
        ? StoredText1
        : StoredText1.filter(
            eachItem => eachItem.text.toUpperCase() === activeTag,
          )

    return (
      <div className="ContainerMain">
        <div className="container1">
          <h1 className="heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.SubmitForm}>
            <label className="label-style" htmlFor="Task">
              Task
            </label>
            <input
              type="text"
              id="Task"
              value={inputText}
              className="input-style"
              placeholder="Enter the task here"
              onChange={this.InputText}
            />
            <label className="label-style margin" htmlFor="Tags">
              Tags
            </label>
            <select
              id="Tags"
              className="input-style"
              value={text}
              onChange={this.onChangeOptionText}
            >
              {tagsList.map(eachItem => (
                <option
                  className=""
                  key={eachItem.optionId}
                  value={eachItem.optionId}
                >
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <div className="center">
              <button className="button-style margin" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>

        <div className="Container-Sub">
          <h1 className="heading2">Tags</h1>
          <ul className="ul-style1">
            {tagsList.map(eachItem => (
              <li className="list-container1" key={eachItem.optionId}>
                <button
                  className={`list1-button-style ${
                    eachItem.optionId === activeTag ? 'color-Change' : ''
                  }`}
                  type="button"
                  onClick={this.onClickFetched}
                  value={eachItem.optionId}
                >
                  {eachItem.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="heading2">Tasks</h1>
          {this.renderListItem(Filtered)}
        </div>
      </div>
    )
  }
}

export default App
