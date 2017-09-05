class Root extends React.Component {
  constructor(){
    super()
    this.elem = null

    this.state = {
      messages: []
    }
  }

  // bindElem(elem) {
  //   this.elem = elem
  // }

  // onClick() {
  //   const message = this.elem.value
  //   const messages = this.state.messages.concat(message)

  //   this.setState({messages})
  // }

  onMessage(message) {
     const messages = this.state.messages.concat(message)
     this.setState({messages})
  }

  render() {
    // <p>root</p>
    // <input type="text" ref={this.bindElem.bind(this)}/>
    // <button onClick={this.onClick.bind(this)}>ok</button>
    return(
      <div>
        <MessageInput onMessage={this.onMessage.bind(this)} />
        <MessagesList data={this.state.messages} />
      </div>
    )
  }
}

class MessageInput extends React.Component {
  onClick() {
    const message =this.refs.messageInput.value;
    this.props.onMessage(message)
  }

  render () {
    return (
      <div>
        <input type="text" ref="messageInput" />
        <button onClick={this.onClick.bind(this)} >ok</button>
      </div>
    )
  }
}

class MessagesList extends React.Component {
  render() {
    const $li = this.props.data.map((message) => {
      return <li>{message}</li>
    })

    return (
      <ul>
        {$li}
      </ul>
    )
  }
}

MessagesList.propTypes = {
  data: React.PropTypes.array.isRequired
}

MessagesList.defaultProps = {
  data: []
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
