import React, { Component } from "react";
import './Container.css';


class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  
  }

  componentDidMount() {

  }
 
  render() {
    return (
          <iframe 
            className={ this.props.className !== undefined ? `container-iframe ${this.props.className}` : `container-iframe`} 
            src={this.props.url} 
            frameBorder="0" 
            allowFullScreen={true}
            //sandbox="allow-scripts"
            referrerPolicy={"unsafe-url"}
            name={this.props.name} />
    );
  }
}

export default Container;

