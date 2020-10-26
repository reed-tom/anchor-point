import React, { Component } from "react";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state={}
      
      }
    componentDidMount(){
    }
    render() {
        return (
            <div className="menu">
                <div className="navbar-brand">
                    Brand
                </div>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <div className="nav-link">
                            Home
                        </div>
                    </li>
                </div>
            </div>
        );
      }
    }
export default Menu;