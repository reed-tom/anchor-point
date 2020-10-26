import React, { Component } from "react";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={}
      
      }
    componentDidMount(){
    }
    render() {
        return (
            <div className="profile">
                <div className="navbar-brand">
                    User
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <div className="nav-link">
                            Login
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link">
                            Logout
                        </div>
                    </li>
                </div>
            </div>
        );
      }
    }
export default Profile;