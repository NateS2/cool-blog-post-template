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

const LeftImage = () => (
  <Image
    floated="left"
    size="medium"
    src="https://source.unsplash.com/random"
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

const RightImage = () => (
  <Image
    floated="right"
    size="medium"
    src="https://source.unsplash.com/random"
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
    const paragraphCount = paragraphs.length;
    const imagecount = images.length;
    // image[0] will be used for heroHeader
  };

  render() {
    const { images, body, title, creator } = this.state.post;
    const { paragraphs } = this.state;
    console.log("render paragraph", paragraphs);
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
        <Container text>{paragraphs[0]}</Container>
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
