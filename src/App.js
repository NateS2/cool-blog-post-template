import React, { Component } from "react";
import HeroHeader from "./heroHeader";
import zupage from "zupage";
import { Container, Header, Image } from "semantic-ui-react";

const LeftImage = props => (
  <Image
    floated="left"
    size="medium"
    src={props.imageSRC}
    style={{ margin: "2em 2em 2em -4em" }}
  />
);

const TopImage = props => (
  <Image
    floated="left"
    size="large"
    // fluid
    src={props.imageSRC}
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
    post: { body: "", images: [], title: "", creator: {}, page: {} },
    paragraphs: [],
    basicObject: [],
    mutatedImages: [],
    heroImage: []
  };

  async componentDidMount() {
    // const post = await zupage.getPost('4122d340-7bdb-4996-8400-f3d582d84280');
    const post = await zupage.getCurrentPost();
    await this.setState({ post }); // await necessary for local data... so could be necessary in some edge cases
    // console.log("Response!", post);
    this.createParagraphs();
    this.assignHeroImage();
  }

  assignHeroImage = () => {
    const { images, title, creator, page } = this.state.post;
    if (images.length === 0) {
      if (
        page.hero_image_url !=
          "https://image.zpcdn.net/00000000-0000-0000-0000-000000000000.jpeg" &&
        page.hero_image_url != null
      ) {
        const sampleImage = {
          caption: null,
          format: "jpeg",
          id: "",
          url: page.hero_image_url
          // height:
          // width:
        };

        const heroImages = [sampleImage];
        // console.log("Hero images", heroImages);
        this.setState({ heroImage: heroImages });
      }
    }
  };

  imageTagCreater = images => {
    return images.map(image => {
      return <Image src={image.url} key={image.id} fluid />;
    });
  };

  /*
  This function splits up the data into usable objects. Split up into 4
  paragraphs and two images if it can. Mutable images is the remaining images
  not used to be placed at the bottom.
*/
  createParagraphs = () => {
    const { body, images } = this.state.post;
    var mutableImages = [];
    Object.assign(mutableImages, images);
    if (body === null) {
      paragraphBody = "";
    } else {
      var paragraphBody = body.split(/[\r\n\t]+/gm);
    }
    // console.log("images", images);
    var fourParagraphs = [];

    if (mutableImages.length >= 2) {
      mutableImages.splice(0, 2);
    }

    for (var i = 0; i < paragraphBody.length; i = i + 4) {
      var lastIndex = paragraphBody.length - i;

      if (lastIndex > 4) {
        lastIndex = 4;
      }
      // console.log("four paragraphs", paragraphBody.slice(i, i + lastIndex));
      fourParagraphs.push(paragraphBody.slice(i, i + lastIndex));
    }

    var twoImages = [];

    for (var i = 0; i < mutableImages.length; i = i + 2) {
      var lastIndex = mutableImages.length - i;

      if (lastIndex > 2) {
        lastIndex = 2;
      }
      // console.log("images array", mutableImages);
      twoImages.push(mutableImages.slice(i, i + lastIndex));
      // console.log("check for undefined", twoImages);
    }

    const obj = [];
    fourParagraphs.map((paragraphs, index) => {
      if (paragraphs.length === 4 && twoImages[index] != undefined) {
        // wont always be two images for a length of 4
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
      // console.log("objects", object);
      return;
    });

    var length = obj.length * 2;
    if (images.length > length && length != 0) {
      obj[obj.length - 1].images = [];
      mutableImages.splice(0, length - 2);
    } else if (images.length > length && length === 0) {
      mutableImages.splice(0, 2);
    } else {
      mutableImages = [];
    }
    this.setState({ mutatedImages: mutableImages });
    this.setState({ basicObject: obj });
    this.setState({ paragraphs: paragraphBody });
  };

  formatBody = () => {
    const { basicObject, mutatedImages } = this.state;
    // image[0] will be used for heroHeader
    // image[1] will be used for the giant intro image

    function safeImageLoad(props) {
      if (props.length === 2) {
        return <RightImage imageSRC={props[1].url} />;
      } else {
        return <div />;
      }
    }

    console.log("basic object length", basicObject);
    return basicObject.map(objects => {
      const { paragraphs, images } = objects;
      if (images === undefined || images.length === 0) {
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
            {safeImageLoad(images)}
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

  renderHeader = () => {
    const { images, title, creator, page } = this.state.post;
    // console.log("heroImage length", this.state.heroImage.length);
    if (images.length === 0) {
      if (this.state.heroImage.length === 1) {
        return (
          <HeroHeader
            title={title}
            creator={creator}
            images={this.state.heroImage}
          />
        );
      }
    } else if (images.length === 1) {
      return <HeroHeader title={title} creator={creator} images={images} />;
    } else {
      return (
        <div>
          <HeroHeader title={title} creator={creator} images={images} />
          <Container text style={{ marginTop: "2em" }}>
            <TopImage imageSRC={images[1].url} />
            {/* <Header as="h1">Sticky Header</Header> */}
          </Container>
        </div>
      );
    }
  };

  render() {
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
        {this.renderHeader()}
        <Container text>{this.formatBody()}</Container>
        <br />
        <br />
        <Container>
          <Image.Group size="medium" centered>
            {this.renderImages()}
          </Image.Group>
        </Container>
      </div>
    );
  }
}
