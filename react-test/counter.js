class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
      count1: 1,
      count2: 1,
    }
  }

  onClick1() {
    const count1 = this.state.count1 + 1
    const newState = Object.assign({}, this.state, {count1})
    this.setState(newState)
    console.log(this.state)
  }

  onClick2() {
    const count2 = this.state.count2 + 1
    const newState = Object.assign({}, this.state, {count2})
    this.setState(newState)
    console.log(this.state)
  }

  render() {
    const {count1, count2} = this.state

    return (
      <div>
        <p>{count1} + {count2} = {count1 + count2}</p>
        <button onClick={this.onClick1.bind(this)} >+</button>
        <button onClick={this.onClick2.bind(this)} >+</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
)
