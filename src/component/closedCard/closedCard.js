import React from "react";
import './closedCard.css';

class ClosedCard extends React.Component {

    render() {
        const { LogoInfo, onClosedCardClick, isDone } = this.props;
        let bg;

        if (isDone) bg = 'ba b--green';
        else if (LogoInfo.hintIsOpen) bg = 'ba b--light-yellow';
        else bg = 'ba b--white';


        return (
            <div
                className={`${bg} div bg-white br3 ma3 grow bw2 shadow-5 pointer`}
                style={{ width: '150px', height: '150px' }}

                onClick={() => onClosedCardClick(LogoInfo)}
            >
                <div className={(isDone) ? 'open' : 'closed'}>
                    <img 
                        style={{height: '142px', width: '150px'}}
                        src={process.env.PUBLIC_URL + LogoInfo.url}
                        alt="Imagen"
                    />
                </div>
            </div>
        )
    }
}

export default ClosedCard;