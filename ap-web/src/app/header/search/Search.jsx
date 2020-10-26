import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={}
      
      }
    componentDidMount(){
    }
    render() {
        return (
            <div className="search">
                <input type="text" name="search" placeholder="Search..." />
            </div>
        );
      }
    }
export default Search;