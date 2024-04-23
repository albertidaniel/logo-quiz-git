import React, { Component } from "react";
import Swal from 'sweetalert2';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            pass1: '',
            pass2: ''
        }
    }

    onUserNameChange = (event) => {
        this.setState({ userName: event.target.value });
    }

    onPass1Change = (event) => {
        this.setState({ pass1: event.target.value });
    }

    onPass2Change = (event) => {
        this.setState({ pass2: event.target.value });
    }

    onButtonSubmit = () => {
        console.log('entro');
        if (this.state.pass1.length > 0 && this.state.userName.length > 0){
            if (this.state.pass1 === this.state.pass2) {
                fetch('https://shrouded-forest-75603-89221b546f06.herokuapp.com/register', {
                    method: 'post',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        name: this.state.userName,
                        password: this.state.pass1
                    })
                })
                    .then(response => response.json())
                    .then(user => {
                        if (user.id) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Successfully registered',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                              })
                            this.props.loadUser(user);
                            this.props.onRouteChange('signin');
                        } else if (user.includes('exists')){
                            Swal.fire({
                                title: 'Error!',
                                text: "User already exists",
                                icon: 'error',
                                confirmButtonText: 'Ok'
                              })
                        }
                    })
            }
            else Swal.fire({
                title: 'Error!',
                text: "Passwords don't match",
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        } else Swal.fire({
            title: 'Error!',
            text: 'Invalid username or password',
            icon: 'error',
            confirmButtonText: 'Ok'
          });

    }

    onKeyDetect = (tecla) => {
        if (tecla.key === 'Enter') {
            this.onButtonSubmit();
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

                                            <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                            <p className="text-white-50 mb-5">Please enter your user and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    onChange={this.onUserNameChange}
                                                    onKeyDown={this.onKeyDetect}
                                                />
                                                <label className="form-label">Username</label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    onChange={this.onPass1Change}
                                                    onKeyDown={this.onKeyDetect}
                                                />
                                                <label className="form-label">Password</label>
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    onChange={this.onPass2Change}
                                                    onKeyDown={this.onKeyDetect}
                                                />
                                                <label className="form-label">Password</label>
                                            </div>

                                            <button
                                                className="btn btn-outline-light btn-lg px-5"
                                                onKeyDown={this.onKeyDetect}
                                                onClick={this.onButtonSubmit}
                                                type="submit">
                                                Register
                                            </button>

                                        </div>

                                        <div className="flex">
                                            <p className="mb-0 center">You already have an account? </p>
                                            <p className="text-white-50 fw-bold pointer center" onClick={() => this.props.onRouteChange('signin')}>Sign In</p>

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

export default Register;