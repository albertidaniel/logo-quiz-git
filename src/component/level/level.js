import React, { Component } from "react";
import ClosedCard from "../closedCard/closedCard";
import './level.css';

class Level extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressBarDone: this.props.progressBarDone,
      progressBarTotal: this.props.progressBarTotal,
      lArray: [],
    };
  }

  componentDidMount() {
    let n = parseInt(this.props.currentLevel.replace("level_", ""));

    let contTotal = 0,
      contDone = 0;
    const logoArray = this.props.LogoCheckedList.map((logo, i) => {
      if (logo.level === n) {
        contTotal++;
        let logoDone = this.props.LogoCheckedList[i].done;
        if (logoDone) contDone++;
        return (
          <ClosedCard
            id={logo.name}
            key={i}
            LogoInfo={this.props.LogoCheckedList[i]}
            onClosedCardClick={this.props.onClosedCardClick}
            isDone={logoDone}
          />
        );
      }
    });
    this.setState({ lArray: logoArray });
    this.setState({ progressBarTotal: contTotal });
    this.setState({ progressBarDone: contDone });
  }

  render() {
    return (
      <div className="mt5">
        <div className="pa2">
          <div
            className="progress center mt0 fixed left-0 right-0 z-999"
            role="progressbar"
            aria-label="Success example"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "350px" }}
          >
            <div
              className="progress-bar bg-success"
              style={{
                width: `${
                  (this.state.progressBarDone / this.state.progressBarTotal) *
                  100
                }%`,
              }}
            >{`${this.state.progressBarDone} / ${this.state.progressBarTotal}`}</div>
          </div>
        </div>

        <div className="tc mt2 pa1 flex flex-wrap justify-center">
          {this.state.lArray}
        </div>
      </div>
    );
  }
}

export default Level;
