import React, { Component } from "react";
import Swal from 'sweetalert2';

class SignIn extends Component {

    constructor(props) {
        super();
        this.state = {
            signInUsername: '',
            signInPassword: ''
        }
    }

    onUsernameChange = (event) => {
        this.setState({ signInUsername: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    onLoginClick = () => {
        
        fetch('https://shrouded-forest-75603-89221b546f06.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name: this.state.signInUsername,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.joined) {
                    this.props.loadUser(user);
                } else Swal.fire({
                    title: 'Error!',
                    text: user,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            })
    }

    onKeyDetect = (tecla) => {
        if (tecla.key === 'Enter') {
            this.onLoginClick();
        }
    }

    render() {
        return (
            <div>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white br4">
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your user and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    onChange={this.onUsernameChange}
                                                    onKeyDown={this.onKeyDetect}
                                                    type="Username"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label">Username</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    onChange={this.onPasswordChange}
                                                    onKeyDown={this.onKeyDetect}
                                                    type="password"
                                                    id="typePasswordX"
                                                    className="form-control form-control-lg"
                                                />
                                                <label className="form-label">Password</label>
                                            </div>

                                            <button
                                                className="btn btn-outline-light btn-lg px-5"
                                                onKeyDown={this.onKeyDetect}
                                                onClick={this.onLoginClick}
                                                type="submit">
                                                Sign In
                                            </button>

                                        </div>

                                        <div className="flex">
                                            <p className="mb-0 center">Don't have an account? </p>
                                            <p className="text-white-50 fw-bold pointer center" onClick={() => this.props.onRouteChange('register')}>Register</p>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SignIn;