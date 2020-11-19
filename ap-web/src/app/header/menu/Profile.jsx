import React, { Fragment, Component } from 'react';
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
      componentDidMount(){
        this.getProfile();
      }
    getProfile(){
        // token = this.state.azureAccessToken;
        var bearer = `Bearer ${Cookies.get('azureAccessToken')}`;
        //console.log(bearer);
        try{
            var result = fetch("http://localhost:5000/profile/me", {
                                                    credentials: 'include',
                                                    headers: {
                                                        'Authorization': bearer,
                                                        'Content-Type': 'application/json'                           
                                                    }
                                                })
                                                .then(response => response.json())
                                                .then(jsonData => this.setState({profile:jsonData}))
                                                .catch(error => {
                                                    //ignore error if no profile returned
                                                });
        } catch(error) {}
    }



    

    logInOut = () => {
        if (this.state.profile.name !== undefined){
            window.location = "http://localhost:5000/auth/logout";
        }else{
            window.location = "http://localhost:5000/auth/login";
        }
    }

    render() {
        

        return (
            <Fragment>
            <li className={this.state.profile.name !== undefined ? "nav-item" : "hidden"}>
                <div className="nav-links" onClick={this.props.closeMenu}>
                    {this.state.profile.name}
                </div>
            </li>
            
            <li className="nav-item">
                <div className="nav-links" onClick={this.logInOut}>
                    {this.state.profile.name !== undefined ? "Logout" : "Login"}
                </div>
            </li>
            </Fragment>
        );
      }
    }
export default Profile;
