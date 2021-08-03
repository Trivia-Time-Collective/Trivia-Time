

const countdown = () => {
  if (this.props.gameOn){
    let x = this;

    let {counter} = this.state;

    let coundownTimer = setTimeout(function () {
      if (counter > 0) {
        x.setState({counter: counter -1 });
      } 
      else {
        x.props.finishGame(coundownTimer);
        x.setState({counter: x.props.val})
      }
    }, 1000);

    return (
      <div>
        Time Left: {this.state.counter}
      </div>
    )
  }
  else {
    return (
      <div>
        Time Over!
      </div>
    )
  }
}

export default countdown;