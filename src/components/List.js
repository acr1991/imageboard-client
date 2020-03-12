import React, { Component } from "react";
import CreateFormContainer from "./CreateFormContainer";
import LoginFormContainer from "./LoginFormContainer";
import SignupFormContainer from "./SignupFormContainer";
import "./List.css";

class List extends Component {
  render() {
    return (
      <section>
        {!this.props.loggedin && <SignupFormContainer />}
        {!this.props.loggedin && <LoginFormContainer />}
        {this.props.loggedin && <CreateFormContainer />}
        <div className="images">
          {this.props.images
            .slice()
            .sort((a, b) => b.id - a.id)
            .map(image => {
              return (
                <div key={image.id} className="image">
                  <h3>{image.title}</h3>
                  <img src={image.url} alt={image.title} />
                </div>
              );
            })}
        </div>
      </section>
    );
  }
}

export default List;
