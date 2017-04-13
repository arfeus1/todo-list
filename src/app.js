const css = require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          'text': 'Zahnart',
          'completed': false
        },
        {
          'text': 'einkaufen',
          'completed': false
        },
        {
          'text': 'essen',
          'completed': true
        }
      ],
      completedFilter: null
    }
    this.handleStatus = this.handleStatus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeView = this.changeView.bind(this)
  }

  componentDidMount() {
    this.focus();
  }
  
  handleSubmit(event) {
    event.preventDefault()
    const newItem = {
      'text': this.refs.new.value,
      'completed': false
    }
    this.setState({
      list: this.state.list.concat([newItem])
    })
    this.refs.new.value = ''
  }
  
  handleStatus(event) {
    const itemText = this.state.list[event.target.value].text
    const itemStatus = this.state.list[event.target.value].completed
    const newItem = {
      'text': itemText,
      'completed': itemStatus ? false : true
    }
    const list = this.state.list
    list[event.target.value] = newItem
    this.setState({
      list
    })
  }
  
  changeView(event) {
      let clickStatus = event.target.value
      if(clickStatus === 'all') {
        this.setState({
          completedFilter: null
        })
      } else if(clickStatus === 'completed') {
        this.setState({
          completedFilter: true
        })
      } else if(clickStatus === 'aktiv') {
        this.setState({
          completedFilter: false
        })
      }
  }
  
  render() {
    let filteredItems = this.state.list
    filteredItems = this.state.list.filter((item) => {
      if (this.state.completedFilter == null) {
        return item
      } else if (this.state.completedFilter) {
        return item.completed
      } else if (!this.state.completedFilter) {
        return !item.completed
      } else {
        return item
      }
    })
    
    return (
      <div>
        <form  className='form-inline' onSubmit={this.handleSubmit}>
          <input autoFocus ref={(input) => { this.textInput = input; }} type='text' placeholder="What needs to be done?" ref='new'></input>
        </form>
        <ul>
          {
          filteredItems.map((item, index) => {
                return <li onClick={this.handleStatus} className={(item.completed) ? 'done' : 'default'} value={index} status={item.completed}>{item.text}</li>
            })
          }
        </ul>
        <div className="filters">
          <button
            onClick={this.changeView}
            value='all'
            type='submit'>all
          </button>
          <button
            onClick={this.changeView}
            value='aktiv'
            type='submit'>aktiv
          </button>
          <button
            onClick={this.changeView}
            value='completed'
            type='submit'>completed
          </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('todo-list'))