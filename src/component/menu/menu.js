import React, { Component } from "react";
import LevelCard from "../levelCard/levelCard";


class Menu extends Component {

    constructor(){
        super();
        this.state = {
            cardArray: []
        }
    }

    componentDidMount(){
        const {list, solvedTotal, LogoCheckedList, onRouteChange, onLevelCardClick} = this.props;
        let LevelCardArray = [];
        let levelProgress = [];

        
        
        levelProgress.push({done: 0, total: 0});
        for (let i = 1; i <= 4; i++) {
            let contDone = 0, contTotal = 0;
            LogoCheckedList.forEach(element => {
                if (element.level === i){
                    contTotal++;
                    if (element.done) contDone++;
                }
            });
            LevelCardArray.push(
                <LevelCard 
                    key={i} 
                    pointsToUnlock={list[i-1]}
                    solvedTotal={solvedTotal}
                    levelId={i} 
                    contDone={contDone}
                    contTotal={contTotal}
                    onRouteChange={onRouteChange}
                    onLevelCardClick={onLevelCardClick}
                />);
        }
        this.setState({cardArray: LevelCardArray});
    }

    render() {
        
        
        return (
            <div className="center mt2 pa4 flex flex-wrap justify-center">
                {this.state.cardArray}
            </div>
        );
    }
}

export default Menu;