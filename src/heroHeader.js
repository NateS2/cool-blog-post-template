import React, { Component } from "react";
import LazyHero from "react-lazy-hero";
import "./App.css";
import { Header, Label, Image } from "semantic-ui-react";

class HeroHeader extends Component {
  state = { images: [], title: "", imageSRC: "", count: 0, creator: {} };

  async componentWillReceiveProps(newProps) {
    console.log("New Props on the hero", newProps);

    await this.setState({
      images: newProps.images,
      title: newProps.title,
      creator: newProps.creator
    });
    console.log("did await", this.state);
  }

  render() {
    return (
      <div>
        <LazyHero
          imageSrc="https://images.unsplash.com/photo-1529446253549-fdcd7d925106?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd224123c1c190693663a5a035ed2a38&auto=format&fit=crop&w=1950&q=80" //imageSrc={this.state.imageSRC}//
          parallaxOffset={100}
          color="#000000"
          opacity={0.1}
          className="App"
          transitionDuration={600}
          transitionTimingFunction="ease-in-out">
          <h1 className="hero-text">{this.state.title}</h1>
          <Label
            attached="bottom right"
            style={{ marginBottom: 5, marginRight: 5 }}>
            <Image avatar src={this.state.creator.profile_image_url} />
            {this.state.creator.name}
          </Label>
        </LazyHero>

        {/* ... */}
      </div>
    );
  }
}

export default HeroHeader;
