import React from "react";
import "./openCard.css";
import Confetti from "react-confetti";
import ParticlesBg from "particles-bg";
import Swal from "sweetalert2";
const levenshtein = require("./levenshtein");

//import { eventWrapper } from "@testing-library/user-event/dist/utils";

class OpenCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      name: "",
      bg: "bg-white",
      solved: this.props.Logo1.done,
      show: false,
      shake: false,
      showHint: this.props.Logo1.hintIsOpen,
    };
    this.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.solved && this.state.solved) {
      this.setState({ show: true });
      this.timer = setTimeout(() => {
        this.setState({ show: false });
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value.toLowerCase() });
  };

  onFetch = (fetchUser, fetchLogo, fetchHint, fetchSolved, fetchPoints) => {
    fetch("https://shrouded-forest-75603-89221b546f06.herokuapp.com/update", {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: fetchUser,
        logoId: fetchLogo,
        hintIsOpen: fetchHint,
        logoIsSolved: fetchSolved,
        points: fetchPoints,
      }),
    });
  };

  onSolvedClick = () => {
    if (this.props.Points >= 30) {
      Swal.fire({
        title: "To solve the logo costs 30 points",
        showCancelButton: true,
        confirmButtonText: "Accept",
      }).then((result) => {
        if (result.isConfirmed) {
          this.onFetch(
            this.props.userId,
            this.props.Logo1.id,
            this.state.showHint,
            true,
            this.props.Points - 30
          );

          this.props.onSolved();
          this.setState({ bg: "" });
          this.setState({ solved: true });
          this.props.onPointsChange(-30);
        }
      });
    } else Swal.fire({
        title: 'Insuficient Points!',
        text: 'You need 30 Points to solve the logo',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
  };

  onHintClick = () => {
    if (!this.state.showHint) {
      if (this.props.Points >= 8) {
        Swal.fire({
          title: "To reveal some letters costs 8 points",
          showCancelButton: true,
          confirmButtonText: "Accept",
        }).then((result) => {
          if (result.isConfirmed) {
            this.onFetch(
              this.props.userId,
              this.props.Logo1.id,
              true,
              this.state.solved,
              this.props.Points - 8
            );

            this.setState({ showHint: true });
            this.props.onChangeHintStatus(this.props.Logo1.name);
            this.props.onPointsChange(-8);
          }
        });
      } else Swal.fire({
        title: 'Insuficient Points!',
        text: 'You need 8 Points to reveal some letters',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  onCheckClick = () => {
    let rightAnswer = false;
    this.props.Logo1.possibleAnswer.forEach((element) => {
      if (levenshtein.value(this.state.input, element) <= 20)
        rightAnswer = true;
    });
    if (rightAnswer) {
      this.onFetch(
        this.props.userId,
        this.props.Logo1.id,
        this.state.showHint,
        true,
        this.props.Points + 10
      );

      this.props.onSolved();
      this.setState({ solved: true });
      this.setState({ bg: "" });
      this.props.onPointsChange(10);
    } else {
      this.setState({ shake: true });
      this.setState({ bg: "bg-light-red" });
      setTimeout(() => this.setState({ shake: false, bg: "bg-white" }), 400);
    }
  };

  onKeyDetect = (tecla) => {
    if (tecla.key === "Enter") {
      this.onCheckClick();
    }
  };

  render() {
    const { Logo1, Points } = this.props;

    return (
      <div className="mt5">
        {this.state.show ? (
          <Confetti className="mt2 center fade-out" width={500} height={600} />
        ) : null}
        {this.state.solved ? (
          <ParticlesBg className="z-100" type="fountain" bg={true} />
        ) : null}
        <article
          className={`${this.state.shake ? "shake" : ""} center ${
            this.state.bg
          } br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5`}
          style={{ width: "300px", height: "auto" }}
        >
          <div className="tc center">
            <p className="tc rakkas-regular f2">{Logo1.category}</p>
            <div className="flex justify-center w-100 h-100 relative">
              <img
                className={`center br2 db w-100 h-100 absolute--fill pa1`}
                src={process.env.PUBLIC_URL + Logo1.url}
                alt={"logo"}
              />
            </div>
            {!this.state.solved ? (
              <div className="">
                <div>
                  <img
                    className={`h2 w2 ma3 grow pointer ${
                      Points < 30 ? "disabled" : ""
                    }`}
                    onClick={this.onSolvedClick}
                    src={process.env.PUBLIC_URL + "images/solve.png"}
                    alt="hint"
                  />
                  <img
                    className={`h2 w2 ma3 grow pointer ${
                      Points < 8 ? "disabled" : ""
                    }`}
                    data-content={"asd"}
                    onClick={this.onHintClick}
                    src={process.env.PUBLIC_URL + "images/hint.png"}
                    alt="hint"
                  />
                </div>
                {this.state.showHint ? (
                  <div className="comic-sans">
                    <p>{Logo1.hint}</p>
                  </div>
                ) : null}
                <input
                  id="input"
                  onKeyDown={this.onKeyDetect}
                  onChange={this.onInputChange}
                  className="f3 mb2 pa2 input-reset br2 ba w-100"
                  type="text"
                />
                <button
                  onClick={this.onCheckClick}
                  className="br3 mb3 w-50 grow f4 link ph3 pv2 dib white bg-light-purple"
                >
                  Check
                </button>
              </div>
            ) : (
              <div>
                <div className="flicker-text">Awesome!</div>
                <h1 className="mt3 pa4">{Logo1.name}</h1>
              </div>
            )}
          </div>
        </article>
      </div>
    );
  }
}

export default OpenCard;
