import React, { Component } from 'react';
import './App.css';
import OpenCard from './component/openCard/openCard';
import Level from './component/level/level';
import { LogoInfo } from './logoInfo';
import Menu from './component/menu/menu';
//import ParticlesBg from 'particles-bg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/navigation/navigation';
import SignIn from './component/signin/signin';
import Register from './component/register/register';
import { cloneDeep } from 'lodash';
//import background from './bg.jpg';
import Swal from 'sweetalert2';

let LogoCheckedList = [];
let list = [0, 7, 14, 21, 28, 35];


class App extends Component {

  constructor() {
    super();
    this.state = {
      route: 'signin',
      currentLevel: '',
      progressBarDone: 0,
      progressBarTotal: 0,
      isSignedIn: false,
      points: 0,
      solvedTotal: 0,
      currentLocked: 1,
      userId: '',
      userName: '',
      LogoInfo: {
        id: 0,
        level: 0,
        name: '',
        url: '',
        done: false,
        hint: '',
        hintIsOpen: false,
        possibleAnswer: [],
        category: ''
      }
    }
  }

  loadUser = async (user) => {
    LogoCheckedList = cloneDeep(LogoInfo); //crear una copia del arreglo y no hacer una referencia al arreglo
    this.setState({ points: user.points });
    this.setState({ userId: user.id });
    this.setState({ userName: user.name });
    try {
      const response = await fetch('https://shrouded-forest-75603-89221b546f06.herokuapp.com/solved', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          userId: user.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.setState({solvedTotal: data.length});
        data.forEach(item => {
          LogoCheckedList.forEach(logo => {
            if (item.logoid.toString() === logo.id.toString()) {
              logo.hintIsOpen = item.hintisopen;
              logo.done = item.logoissolved;
            }
          });
        });
        this.onRouteChange('menu');
      } else {
        console.error('Request error:', response.status);
      }
    } catch (error) {
      console.error('Error proccesing the request:', error);
    }
  }

  onClosedCardClick = (event) => {
    this.setState({ route: 'open_card' });
    this.setState({
      LogoInfo: {
        ...event
      }
    });
    let lev = 'level_' + event.level.toString();
    this.setState({ currentLevel: lev });
  }

  onChangeHintStatus = (name) => {
    LogoCheckedList = LogoCheckedList.map(item => {
      if (item.name === name) {
        return { ...item, hintIsOpen: true }
      }
      return item;
    });
  }

  onPointsChange = (number) => {
    this.setState({ points: this.state.points + number });
    if (number === 10) this.setState({ solvedTotal: this.state.solvedTotal + 1 });
  }

  onClosedCardChange = (name) => {
    LogoCheckedList.forEach(element => {
      if (element.name === name) {
        element.done = true;
      }
    });
    let n = parseInt(this.state.currentLevel.replace('level_', ''));
    let done = 0, total = 0;
    LogoCheckedList.forEach(element => {
      if (element.level === n) {
        total++;
        if (element.done) done++;
      }
    });
    this.setState({ progressBarDone: done });
    this.setState({ progressBarTotal: total });

    if (this.state.solvedTotal === list[this.state.currentLocked]) {
      Swal.fire({
        title: 'Info',
        text: 'New level unlocked',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      this.setState({ currentLocked: this.state.currentLocked + 1 });
    }
  }

  onLevelCardClick = (newRoute) => {
    this.onRouteChange(newRoute);
    this.setState({ currentLevel: newRoute });
  }

  onSolved = () => {
    this.setState({
      LogoInfo: {
        ...this.state.LogoInfo, done: true
      }
    });
  }

  onRouteChange = (newRoute) => {
    this.setState({ route: newRoute });
  }

  render() {
    return (

      <div 
        className="tc justify-center z-999" 
        // style={{ 
        //   backgroundImage: `url(${background})`, 
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        //   height: '100vh'
        // }}
        >
          
        {/*<ParticlesBg className="z-999" type="cobweb" bg={true} />*/}
        {(this.state.route === 'signin' || this.state.route === 'register') ?
          <div>
            {(this.state.route === 'signin') ?
              <SignIn
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
              /> :
              <Register
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
              />
            }
          </div>
          :
          <div>
            <Navigation
              className="center z-000"
              Route={this.state.route}
              Points={this.state.points}
              onRouteChange={this.onRouteChange}
              currentLevel={this.state.currentLevel}
              onClosedCardChange={this.onClosedCardChange}
              Logo1={this.state.LogoInfo}
              userName={this.state.userName}
            />
            <div className='flex justify-center'>

              {(this.state.route === 'menu') ?
                <Menu
                  className="pa3"
                  list={list}
                  solvedTotal={this.state.solvedTotal}
                  LogoCheckedList={LogoCheckedList}
                  onRouteChange={this.onRouteChange}
                  onLevelCardClick={this.onLevelCardClick}
                />
                :
                (this.state.route.includes('level')) ?
                  < Level
                    currentLevel={this.state.currentLevel}
                    onClosedCardClick={this.onClosedCardClick}
                    onRouteChange={this.onRouteChange}
                    LogoCheckedList={LogoCheckedList}
                    progressBarDone={this.state.progressBarDone}
                    progressBarTotal={this.state.progressBarTotal}
                  />
                  : (this.state.route === 'open_card') ?
                    <OpenCard
                      Logo1={this.state.LogoInfo}
                      onClosedCardChange={this.onClosedCardChange}
                      onRouteChange={this.onRouteChange}
                      currentLevel={this.state.currentLevel}
                      onPointsChange={this.onPointsChange}
                      onChangeHintStatus={this.onChangeHintStatus}
                      Points={this.state.points}
                      onSolved={this.onSolved}
                      userId={this.state.userId}
                    /> : <h1>NO such route</h1>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
