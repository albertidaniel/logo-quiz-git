import React, { Component } from "react";
import "./levelCard.css";
import Swal from "sweetalert2";

class LevelCard extends Component {
  clickOnLockedCard = () => {
    let cant =
      this.props.pointsToUnlock - this.props.solvedTotal > 1 ? "logos" : "logo";
    Swal.fire({
      title: "Level locked",
      text: `You need to solve ${
        this.props.pointsToUnlock - this.props.solvedTotal
      } ${cant} to unlock this level`,
      icon: "info",
      confirmButtonText: "Ok",
    });
  };

  render() {
    let {
      pointsToUnlock,
      solvedTotal,
      levelId,
      onLevelCardClick,
      contDone,
      contTotal,
    } = this.props;
    let open;

    if (pointsToUnlock > solvedTotal) open = false;
    else open = true;

    return (
      <div
        className={`${!open ? "locked" : null} pa3 pointer`}
        onClick={
          open
            ? () => onLevelCardClick("level_" + levelId)
            : this.clickOnLockedCard
        }
      >
        <div className="bg-white center h5 w5 d-flex flex-column div br3 ma4 mb2 grow bw2 shadow-5">
          <img
            style={{ position: "absolute", zIndex: 1 }}
            src={`/fotos/level/level ` + levelId + ".jpeg"}
            alt={"Level " + levelId}
          />

          <div
            className="mt1 mb2 progress w4 center"
            style={{ position: "relative", zIndex: 2 }}
            role="progressbar"
            aria-label="Success example"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="z-999 progress-bar bg-success"
              style={{ width: `${(contDone / contTotal) * 100}%` }}
            ></div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default LevelCard;
