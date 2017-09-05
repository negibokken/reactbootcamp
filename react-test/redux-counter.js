class Counter extends React.Component {

  onClickPlus() {
    this.props.onIncrement(1)
  }

  onClickMinus() {
    this.props.onDecrement(1)
  }

  onClickIncrementIfOdd() {
    this.props.onIncrementIfOdd(1, this.props.value)
  }

  onClickAsync() {
    this.props.onIncrementAsync(1)
  }

  render() {
    const {value, onIncrement} = this.props
    return (
      <div>
        <p>{value}</p>
        <button onClick={this.onClickPlus.bind(this)}>+</button>
        <button onClick={this.onClickMinus.bind(this)}>-</button>
        <button onClick={this.onClickIncrementIfOdd.bind(this)}>increment if odd</button>
        <button onClick={this.onClickAsync.bind(this)}>increment async</button>
      </div>
    )
  }
}

// action type
const INCREMENT = "Increment"
const DECREMENT = "Decrement"
const Noope = "Noope"

// action creator
const increment = (n) => {
  // action
  return { type: INCREMENT, delta: n}
}

const decrement = (n) => {
  // action
  return {type: DECREMENT, delta: n}
}

const incrementIfOdd = (n, value, dispatch) => {
  // action
  //if (value % 2 === 0 ) return
  if ( value % 2 === 0 ) return
  dispatch(increment(n))
  // return {type: "Noope"}
  // return {type: DECREMENT, delta: n}
}

const incrementAsync = (n, dispatch) => {
    setTimeout(() => {
      dispatch(increment(n)) // {type: INCREMENT, delta: n})
    },1000)
}

// reducer
const counterReducer = (state, action) => {
  // action の指示を実行し、
  // 渡された state を新しい state に
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, {value: state.value + action.delta})
    case DECREMENT:
      return Object.assign({}, state, {value: state.value - action.delta})
    case Noope:
      // return state as is
      return state
    default:
      return state
  }
}

function mapStateToProps(state) {
  // component の props.value に
  //state の value を渡す (map)
  return { value: state.value }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onIncrement(n) {
      // action creator を dispatch する関数を
      // component に渡す (map)
      dispatch(increment(n)/*action*/)
    },
    onDecrement(n) {
      dispatch(decrement(n))
    },
    onIncrementIfOdd(n, value) {
      // if (value % 2 === 0) return
      incrementIfOdd(n, value, dispatch)/*action*/
    },
    onIncrementAsync(n) {
      // dispatch(incrementAsync(n))
      //incrementAsync(n).then((action) => {
      //  console.log(action);
      //  dispatch(action)
      //})
      incrementAsync(n, dispatch)
    }
  }
}

const AppContainer = ReactRedux.connect(
  // 連携を記述する
  mapStateToProps,
  mapDispatchToProps
)(Counter)

// store
const initialState = { value: 0 }
const store = Redux.createStore(counterReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <AppContainer />
  </ReactRedux.Provider>,
  document.getElementById('root')
)
