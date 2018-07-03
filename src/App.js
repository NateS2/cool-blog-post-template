import _ from "lodash";
import React, { Component } from "react";
import HeroHeader from "./heroHeader";
import zupage from "zupage";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility
} from "semantic-ui-react";

const overlayStyle = {
  float: "left",
  margin: "0em 3em 1em 0em"
};

const fixedOverlayStyle = {
  ...overlayStyle,
  position: "fixed",
  top: "80px",
  zIndex: 10
};

const overlayMenuStyle = {
  position: "relative",
  left: 0,
  transition: "left 0.5s ease"
};

const fixedOverlayMenuStyle = {
  ...overlayMenuStyle,
  left: "800px"
};

const LeftImage = props => (
  <Image
    floated="left"
    size="medium"
    src={props.imageSRC}
    style={{ margin: "2em 2em 2em -4em" }}
  />
);

const TopImage = () => (
  <Image
    floated="left"
    size="large"
    // fluid
    src="https://source.unsplash.com/random"
    style={{
      marginTop: -120, //-150
      marginLeft: -50,
      backgroundColor: "#fff",
      padding: 4
    }}
  />
);

const RightImage = props => (
  <Image
    floated="right"
    size="medium"
    src={props.imageSRC}
    style={{ margin: "2em -4em 2em 2em" }}
  />
);

export default class StickyLayout extends Component {
  state = {
    post: { body: "", images: [], title: "", creator: "" },
    paragraphs: []
  };

  async componentDidMount() {
    // const post = await zupage.getPost('4122d340-7bdb-4996-8400-f3d582d84280');
    const post = await zupage.getCurrentPost();
    this.setState({ post });
    console.log("Response!", post);
    this.createParagraphs();
  }

  imageTagCreater = images => {
    return images.map(image => {
      return <Image src={image.url} key={image.id} fluid />;
    });
  };

  createParagraphs = () => {
    const { body } = this.state.post;
    var paragraphBody = body.split(/[\r\n\t]+/gm);
    this.setState({ paragraphs: paragraphBody });
  };

  formatBody = () => {
    const { paragraphs } = this.state;
    const { images } = this.state.post;
    var paragraphCount = 0;
    var imageCount = 2;
    // image[0] will be used for heroHeader
    // image[1] will be used for the giant intro image
    function basicStructure() {
      paragraphCount = paragraphCount + 4;
      imageCount = imageCount + 2;
      return (
        <div>
          {paragraphs[paragraphCount - 4]}
          <br />
          <br />
          {paragraphs[paragraphCount - 3]}
          <br />
          <br />
          {paragraphs[paragraphCount - 2]}
          <LeftImage imageSRC={images[imageCount - 2].url} />
          <br />
          <br />
          {paragraphs[paragraphCount - 1]}
          <RightImage imageSRC={images[imageCount - 1].url} />
          <br />
          <br />
        </div>
      );
    }
    function edgeCases() {
      let jsx = [];
      // jsx.push(<div>)
      var counter = 0;
      if (
        // more than 4 paragraphs less than 2 images
        paragraphCount + 4 <= paragraphs.length &&
        imageCount + 2 > images.length
      ) {
        while (paragraphCount < paragraphs.length) {
          counter += 1;
          if (counter === 3 && imageCount <= images.length) {
            jsx.push(<div>{paragraphs[paragraphCount]}</div>);
            jsx.push(<LeftImage imageSRC={images[imageCount].url} />);
            jsx.push(<br />);
            jsx.push(<br />);
            imageCount += 1;
          } else {
            jsx.push(<div>{paragraphs[paragraphCount]}</div>);
            jsx.push(<br />);
            jsx.push(<br />);
          }
          paragraphCount += 1;
        }
      }
      if (
        // less than 4 paragraphs more than 2 images
        paragraphCount + 4 >= paragraphs.length &&
        imageCount + 2 <= images.length
      ) {
        while (paragraphCount < paragraphs.length) {
          jsx.push(<div>{paragraphs[paragraphCount]}</div>);
          jsx.push(<br />);
          jsx.push(<br />);
          paragraphCount += 1;
        }
        while (imageCount < images.length) {
          jsx.push(<Image size="medium" src={images[imageCount].url} />);
          imageCount += 1;
        }
      }
      if (
        // less than 4 paragraphs less than 2 images
        paragraphCount + 4 >= paragraphs.length &&
        imageCount + 2 >= images.length
      ) {
        while (paragraphCount < paragraphs.length) {
          jsx.push(<div>{paragraphs[paragraphCount]}</div>);
          jsx.push(<br />);
          jsx.push(<br />);
          paragraphCount += 1;
        }
        while (imageCount < images.length) {
          jsx.push(<LeftImage imageSRC={images[imageCount].url} />);
          imageCount += 1;
        }
      }
      return <div>{jsx}</div>;
    }
    function structureLogic() {
      let returnArray = [];
      while (
        paragraphCount + 4 <= paragraphs.length &&
        imageCount + 2 <= images.length
      ) {
        console.log("while loop ran");
        returnArray.push(basicStructure());
      }
      returnArray.push(edgeCases());
      return returnArray;
    }

    return structureLogic();
  };

  render() {
    const { images, body, title, creator } = this.state.post;
    const { paragraphs } = this.state;
    console.log("render paragraph", paragraphs);
    console.log("what the hell wrong with images", images);
    return (
      <div>
        {/* Heads up, style below isn't necessary for correct work of example, simply our docs defines other
            background color.
          */}
        <style>{`
          html, body {
            background: #fff;
          }
        `}</style>
        <HeroHeader title={title} creator={creator} images={images} />
        <Container text style={{ marginTop: "2em" }}>
          <TopImage />
          <Header as="h1">Sticky Header</Header>
        </Container>
        <Container text>{this.formatBody()}</Container>
      </div>
    );
  }
}

{
  /* <div
  ref={this.handleOverlayRef}
  style={overlayFixed ? fixedOverlayStyle : overlayStyle}>
  <Menu
    icon="labeled"
    style={overlayFixed ? fixedOverlayMenuStyle : overlayMenuStyle}
    vertical>
    <Menu.Item>
      <Icon name="twitter" />
      Twitter
    </Menu.Item>

    <Menu.Item>
      <Icon name="facebook" />
      Share
    </Menu.Item>

    <Menu.Item>
      <Icon name="mail" />
      Email
    </Menu.Item>
  </Menu>
</div> */
}

// import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import { Container, Image, Header } from "semantic-ui-react";
// import HeroHeader from "./heroHeader";
// import zupage from "zupage";
//
// class App extends Component {
//   state = { post: { body: "", images: [] } };
//
//   async componentDidMount() {
//     // const post = await zupage.getPost('4122d340-7bdb-4996-8400-f3d582d84280');
//     const post = await zupage.getCurrentPost();
//     this.setState({ post });
//     console.log("Response!", post);
//   }
//
//   render() {
//     return (
//       <Container fluid>
//         <HeroHeader />
//         <Container textAlignment="center" style={{ width: 500 }}>
//           Lorem ipsum dolor amet ramps dreamcatcher stumptown beard, poke
//           shoreditch asymmetrical narwhal. Kale chips salvia selvage, adaptogen
//           kogi vaporware offal chambray. Man braid man bun venmo quinoa,
//           actually bushwick normcore. Jianbing keffiyeh trust fund bespoke
//           polaroid quinoa retro hashtag. Vape synth +1, bitters activated
//           charcoal snackwave 90's cliche. Street art beard neutra, PBR&B
//           sriracha tousled fanny pack ethical meh. Cliche pug succulents vice
//           palo santo pickled. Copper mug jianbing marfa iceland adaptogen
//           single-origin coffee neutra deep v sriracha cliche unicorn plaid viral
//           truffaut biodiesel. Viral retro raclette organic, keytar semiotics
//           offal chartreuse bespoke unicorn. Typewriter artisan next level
//           portland williamsburg. Freegan hexagon selvage meggings sartorial
//           wayfarers pour-over art party mlkshk pork belly. Prism waistcoat
//           actually hexagon bespoke. Cloud bread tote bag humblebrag mlkshk
//           copper mug ugh blue bottle dreamcatcher man braid. Food truck hashtag
//           lyft, knausgaard ramps vegan pour-over slow-carb celiac live-edge put
//           a bird on it pinterest sriracha. Typewriter cardigan keytar humblebrag
//           activated charcoal coloring book tbh. Vape fixie DIY selfies cornhole
//           drinking vinegar, hoodie tote bag palo santo plaid dreamcatcher retro
//           shabby chic fam. Paleo succulents ennui vexillologist, blue bottle
//           glossier marfa meggings bushwick. Gochujang semiotics coloring book
//           banjo flannel pitchfork. Blog XOXO mlkshk iceland affogato edison bulb
//           celiac selfies. Occupy activated charcoal williamsburg cardigan, woke
//           jianbing copper mug succulents. Tote bag fanny pack asymmetrical
//           actually twee. Butcher pok pok slow-carb flexitarian gluten-free
//           jianbing man bun mustache cronut, heirloom sartorial quinoa photo
//           booth disrupt. Disrupt distillery put a bird on it, coloring book man
//           bun sartorial woke succulents helvetica tattooed echo park pop-up
//           chillwave paleo portland. Pitchfork helvetica banh mi tattooed squid
//           trust fund. Yr mustache organic glossier tattooed polaroid fixie
//           hashtag pitchfork cronut tbh jean shorts banjo fingerstache
//           meditation. Ethical shabby chic iPhone, locavore viral put a bird on
//           it cold-pressed godard occupy dreamcatcher af williamsburg leggings
//           tilde.
//         </Container>
//       </Container>
//     );
//   }
// }
//
// export default App;
