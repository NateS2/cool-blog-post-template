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
    paragraphs: [],
    basicObject: [],
    mutatedImages: []
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
    const { body, images } = this.state.post;
    var mutableImages = [];
    Object.assign(mutableImages, images);
    var paragraphBody = body.split(/[\r\n\t]+/gm);
    console.log("images", images);
    var fourParagraphs = [];

    if (mutableImages.length >= 2) {
      mutableImages.splice(0, 2);
    }

    for (var i = 0; i < paragraphBody.length; i = i + 4) {
      var lastIndex = paragraphBody.length - i;

      if (lastIndex > 4) {
        lastIndex = 4;
      }
      console.log("four paragraphs", paragraphBody.slice(i, i + lastIndex));
      fourParagraphs.push(paragraphBody.slice(i, i + lastIndex));
    }

    var twoImages = [];

    for (var i = 0; i < mutableImages.length; i = i + 2) {
      var lastIndex = mutableImages.length - i;

      if (lastIndex > 2) {
        lastIndex = 2;
      }
      // console.log("two images", mutableImages.slice(i, i + lastIndex));
      console.log("images array", mutableImages);
      twoImages.push(mutableImages.slice(i, i + lastIndex));
    } // aye you nathan.... finish this up please... you just need to finish this loop like the one above

    const obj = [];
    fourParagraphs.map((paragraphs, index) => {
      if (paragraphs.length === 4) {
        var object = {
          paragraphs: paragraphs,
          images: twoImages[index]
        };
      } else {
        var object = {
          paragraphs: paragraphs,
          images: []
        };
      }

      obj.push(object);
      console.log("objects", object);
      return;
    });

    console.log("images length", this.state.post.images.length);
    console.log("obj length", obj.length);
    var length = obj.length * 2;
    if (images.length > length) {
      var lastObj = {};
      Object.assign(lastObj, obj[obj.length - 1]);
      console.log("lastObj", lastObj);

      if (lastObj.images.length === 0) {
        mutableImages.splice(0, length - 2);
      } else {
        mutableImages.splice(0, length);
      }
    }
    console.log("mutableImages", mutableImages);
    this.setState({ mutatedImages: mutableImages });
    this.setState({ basicObject: obj });
    this.setState({ paragraphs: paragraphBody });
  };

  formatBody = () => {
    const { basicObject, mutatedImages } = this.state;
    // image[0] will be used for heroHeader
    // image[1] will be used for the giant intro image
    console.log("basic object length", basicObject);
    return basicObject.map(objects => {
      console.log("objects in da map", objects);
      const { paragraphs, images } = objects;
      if (images.length == 0) {
        return paragraphs.map(paragraph => {
          return (
            <div>
              {paragraph}
              <br />
              <br />
            </div>
          );
        });
      } else {
        return (
          <div>
            {paragraphs[0]}
            <br />
            <br />
            {paragraphs[1]}
            <br />
            <br />
            {paragraphs[2]}
            <LeftImage imageSRC={images[0].url} />
            <br />
            <br />
            {paragraphs[3]}
            <RightImage imageSRC={images[1].url} />
            <br />
            <br />
          </div>
        );
      }
    });
  };

  renderImages = () => {
    return this.state.mutatedImages.map(image => {
      return <Image src={image.url} />;
    });
  };

  render() {
    const { images, body, title, creator } = this.state.post;
    const { paragraphs } = this.state;

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
        <Image.Group size="medium">{this.renderImages()}</Image.Group>
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
