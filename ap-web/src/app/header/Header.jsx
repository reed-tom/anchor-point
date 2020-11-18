import React, { Component } from "react";
import Menu from "./menu/Menu";
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
            <div className="">
                
                <Menu />
                <Search />
            </div>
        );
      }
    }
export default Header;