import React, { Fragment, Component } from "react";
import Profile from "./Profile";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state={
            click: false
        }
      
      }
    componentDidMount(){
    }
    handleClick = () => {this.setState({click:!this.state.click});}
    closeMobileMenu = () => {this.setState({click:false});};

    render() {
        return (
            <Fragment>
            <nav className="navbar">
                <div className="navbar-container">
                    <a className="navbar-logo" href="/">Anchor<i className="fas fa-project-diagram"><br />Point</i></a>
                <div className="menu-icon" onClick={this.handleClick}><i className={this.state.click ? 'fas fa-times' : 'fas fa-bars'} /></div>
                <div className="menu">
                    <ul className={this.state.click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <div className="nav-links" onClick={this.closeMobileMenu}>
                                iMap
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-links" onClick={this.closeMobileMenu}>
                                GATT
                            </div>
                        </li>
                        <Profile closeMenu={this.closeMobileMenu}></Profile>
                    </ul>
                </div>
                </div>
            </nav>
            </Fragment>

        );
      }
    }
export default Menu;