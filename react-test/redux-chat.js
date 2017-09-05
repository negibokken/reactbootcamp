class MessagesList extends React.Component {

  render() {
    const messages = this.props.data
    const $li = messages.map((message) => {
      return <li>{message}</li>
    })

    return (
      <ul>
        {$li}
      </ul>
    )
  }
}

const MessagesListContainer = ReactRedux.connect(
  // 連携を記述する
  (state) => {
    return { data: state.data }
  },
  (dispatch) => {
    // none
  }
)(MessagesList)

class MessageInput extends React.Component {
  onClick() {
    this.props.onSubmit(this.refs.messageInput.value)
  }

  render() {
    return(
      <div>
        <input type="text" ref="messageInput" />
        <button onClick={this.onClick.bind(this)}>ok</button>
      </div>
    )
  }
}

// action
const SUBMIT = "Submit"

// action creator
const submit = (message) => {
  return { type: SUBMIT, message}
}

const MessageInputContainer = ReactRedux.connect(
  (state) => {
    // none
  },
  (dispatch) => {
    return {
      onSubmit(message) {
        dispatch(submit(message))
      }
    }
  }
)(MessageInput)

// reducer
const chatReducer = (state, action) => {
  // action の指示を実行し、
  // 渡された state を新しい state に
  switch (action.type) {
    case SUBMIT:
      return Object.assign({}, state, {data: state.data.concat(action.message)})
    default:
      return state
  }
}

class AppComponent extends React.Component {
  render() {
    return(
      <div>
        <MessageInputContainer />
        <MessagesListContainer />
      </div>
    )
  }
}

//
// store
const initialState = { data: [] }
const store = Redux.createStore(chatReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppComponent />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
