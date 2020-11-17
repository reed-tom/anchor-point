import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            azureAccessToken: Cookies.get('azureAccessToken'),
            profile:{},
        }
        this.getProfile = this.getProfile.bind(this);

      }

    getProfile(){
        // token = this.state.azureAccessToken;
        var bearer = `Bearer ${Cookies.get('azureAccessToken')}`;
        //console.log(bearer);
        fetch("http://localhost:5000/profile/me", {
                                                method: 'GET',
                                                withCredentials: true,
                                                credentials: 'include',
                                                headers: {
                                                    'Authorization': bearer,
                                                    'Content-Type': 'application/json'                           
                                                }
                                            })
                                            .then(response => response.json())
                                            .then(jsonData=>{
                                                this.setState({profile:jsonData},()=>{
                                                    //console.log(this.state.profile);
                                                });
                                            });
    }

    componentDidMount(){
        //console.log('azureAccessToken', Cookies.get('azureAccessToken'));
        this.getProfile();
    }
   

    render() {
        var content = ""
        if (this.state.profile.name === undefined){
            content = <a href='http://localhost:5000/auth/login'>Login</a>
        }else{
            content = <a href='http://localhost:5000/auth/logout'>Logout</a>
        }
        return (
            <div className="profile">
                <div className="navbar-brand">
                    User
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <div className="nav-link">
                        {content}
                        </div>
                    </li>
                    <li className="nav-item">
                        {this.state.profile.name}                        
                    </li>
                </div>
            </div>
        );
      }
    }
export default Profile;

const ProfileButton = props => {
    return (
      <div
        className={props.className}
        onClick={() => {
          props.onClick();
        }}
      >
        {props.value}
      </div>
    );
  };