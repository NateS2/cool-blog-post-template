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

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "4em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease"
};

const fixedMenuStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"
};

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
    src="https://source.unsplash.com/random"
    style={{
      marginTop: -150,
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

const Paragraph = () => (
  <p>
    {[
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ",
      "tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas ",
      "semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ",
      "ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean ",
      "fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ",
      "Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor ",
      "neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ",
      "accumsan porttitor, facilisis luctus, metus"
    ].join("")}
  </p>
);

export default class StickyLayout extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
    post: { body: "", images: [], title: "", creator: {} }
  };

  async componentDidMount() {
    // const post = await zupage.getPost('4122d340-7bdb-4996-8400-f3d582d84280');
    const post = await zupage.getCurrentPost();
    this.setState({ post });
    console.log("Response!", post);
  }

  handleOverlayRef = c => {
    const { overlayRect } = this.state;

    if (!overlayRect) {
      this.setState({
        overlayRect: _.pick(c.getBoundingClientRect(), "height", "width")
      });
    }
  };

  stickOverlay = () => this.setState({ overlayFixed: true });

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickOverlay = () => this.setState({ overlayFixed: false });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed, overlayFixed, overlayRect } = this.state;
    const { images, body, title, creator } = this.state.post;

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
        <HeroHeader title={title} creator={creator} />
        <Container text style={{ marginTop: "2em" }}>
          <TopImage />
          <Header as="h1">Sticky Example</Header>
        </Container>

        {/* Attaching the top menu is a simple operation, we only switch `fixed` prop and add another style if it has
            gone beyond the scope of visibility
          */}

        <Container text>
          {_.times(3, i => <Paragraph key={i} />)}

          {/* Example with overlay menu is more complex, SUI simply clones all elements inside, but we should use a
              different approach.
              An empty Visibility element controls the need to change the fixing of element below, it also uses height
              and width params received from its ref for correct display.
            */}
          <Visibility
            offset={80}
            once={false}
            onTopPassed={this.stickOverlay}
            onTopVisible={this.unStickOverlay}
            style={overlayFixed ? { ...overlayStyle, ...overlayRect } : {}}
          />

          <div
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
          </div>

          {_.times(3, i => <Paragraph key={i} />)}
          <LeftImage />

          <Paragraph />
          <RightImage />

          {_.times(4, i => <Paragraph key={i} />)}
          <LeftImage />

          <Paragraph />
          <RightImage />

          {_.times(2, i => <Paragraph key={i} />)}
        </Container>

        <Segment
          inverted
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
          vertical>
          <Container textAlign="center">
            <Grid columns={4} divided stackable inverted>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as="h4" content="Group 1" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as="h4" content="Group 2" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as="h4" content="Group 3" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as="h4" content="Footer Header" />
                  <p>
                    Extra space for a call to action inside the footer that
                    could help re-engage users.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Image
              src="https://source.unsplash.com/random"
              centered
              size="mini"
            />
            <List horizontal inverted divided link>
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
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
