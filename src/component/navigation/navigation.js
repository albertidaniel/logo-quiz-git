import React from "react";
import './navigation.css';

class Navigation extends React.Component {

    onBackClick = () => {
        this.props.onRouteChange(this.props.currentLevel)
        if (this.props.Logo1.done) {
            this.props.onClosedCardChange(this.props.Logo1.name);
        }
    }

    render() {
        const { Route, Points, onRouteChange, userName } = this.props;
        let level;
        if (Route.includes('level')) {
            level = parseInt(Route.replace('level_', ''));
        }
        return (
            <nav className="navbar w-100 navbar-light bg-light fixed-top d-flex justify-content-between">

                {(Route.includes('level')) ?
                    <div className="d-flex">
                        <span
                            className="material-symbols-outlined grow pointer ml2"
                            onClick={() => onRouteChange('menu')}
                        >home</span>
                    </div> : null
                }
                {(Route.includes('level')) ?
                    <div>
                        <p className="d-flex madimi-one-regular">{'Level ' + level}</p>
                    </div> : null
                }
                {(Route === 'open_card') ?
                    <div className="">
                        <span className="material-symbols-outlined grow pointer ml2"
                            onClick={this.onBackClick}
                        >
                            arrow_back
                        </span>

                    </div> : null
                }
                <div className="flex justify-end madimi-one-regular">
                    <p>{Points} Points</p>
                </div>
                <p className="madimi-one-regular">Hello {userName}</p>
                <span className="material-symbols-outlined grow pointer mr2"
                    onClick={() => onRouteChange('signin')}
                >
                    logout
                </span>
            </nav>
        );
    }
}

export default Navigation;