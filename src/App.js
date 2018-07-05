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
      var lastObj = obj.pop();

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
        var aidsCode = 0;
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

  renderImages = () => {
    if (this.state.shouldRenderImages) {
      return this.state.post.images.map(image => {
        return <Image src={image.url} />;
      });
    }
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
        <Image.Group>{this.renderImages()}</Image.Group>
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
