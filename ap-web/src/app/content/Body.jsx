import React, { Component } from "react";
import Container from "./modules/Container";
import './Body.css';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state={}
      
      }
    componentDidMount(){
    }
    render() {
        return (
            <div className="body">
                <Container name="i-Map" url="https://intra.dev.regionalgis.mto.gov.on.ca/map/"></Container>
                {/*<Container name="Geomatics" url="https://intra.dev.regionalgis.mto.gov.on.ca/geomatics/"></Container>*/}
                
            </div>
        );
      }
    }
export default Body;