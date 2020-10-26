import React, { Component } from "react";
import Menu from "./menu/Menu";
import Profile from "./profile/Profile";
import Search from "./search/Search";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state={}
      
      }
    componentDidMount(){
    }
    render() {
        return (
            <div className="header bg-dark">
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Menu />
                    <Search />
                    <Profile />
                </nav>
            </div>
        );
      }
    }
export default Header;