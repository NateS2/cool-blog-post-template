import React, { Component } from "react";
import LazyHero from "react-lazy-hero";

class HeroHeader extends Component {
  state = { images: [], title: "", imageSRC: "", count: 0 };

  async componentWillReceiveProps(newProps) {
    console.log("New Props on the hero", newProps);

    await this.setState({ images: newProps.images, title: newProps.title });
    console.log("did await", this.state);
  }

  // changeHeroImage = () => {
  //   // do whatever you like here
  //   var images = IMAGES; //this.state.images;
  //   var count = this.state.count;
  //   var a = this;
  //   var url = "";
  //
  //   if (count >= images.length) {
  //     count = 0;
  //   }
  //   images.map(function(image, index) {
  //     if (index == count) {
  //       url = image.url;
  //     }
  //   });
  //   count++;
  //   this.setState({ imageSRC: url, count: count });
  //   setTimeout(this.changeHeroImage, 5000);
  // };

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
          <h1 className="hero-text">Dylan, "can't fire"; da bitch</h1> //{
            this.state.title
          }
        </LazyHero>

        {/* ... */}
      </div>
    );
  }
}

export default HeroHeader;
