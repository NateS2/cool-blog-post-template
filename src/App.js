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
    const post = await zupage.getCurrentPost(); // uncommment this for build
    // console.log("this is a post", post);
    // const post = {
    //   id: "00000000-0000-0000-0000-000000000000",
    //   body: null, //"This is a body! aalsdhf a;sldhf;alsdjf /n ;lakshdkjl",
    //   creator: {
    //     id: "00000000-0000-0000-0000-000000000000",
    //     email: "matt@zupage.com",
    //     name: null,
    //     profile_image_url:
    //       "https://media.zupage.com/images/00000000-0000-0000-0000-000000000000"
    //   },
    //   images: [],
    //   is_shared: false,
    //   title: null, //"A hard working blue collar title",
    //   description: null,
    //   modified_time: 1519838723.028098,
    //   page: {
    //     id: "00000000-0000-0000-0000-000000000000",
    //     description: "This is a zupage website!",
    //     domain: "zupage.com",
    //     hero_image_url:
    //       "https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg", //"https://media.zupage.com/images/00000000-0000-0000-0000-000000000000",
    //     icon_image_url:
    //       "https://media.zupage.com/images/00000000-0000-0000-0000-000000000000",
    //     is_private: false,
    //     name: "My Zupage",
    //     relationship: "owner",
    //     subdomain: "mypage",
    //     subscribed: true,
    //     theme_id: "00000000-0000-0000-0000-000000000000"
    //   },
    //   published_time: 1519838723.028098
    // };

    await this.setState({ post }); // await necessary for local data... so could be necessary in some edge cases
    console.log("Response!", post);
    this.createParagraphs();
    this.assignHeroImage();
  }

  assignHeroImage = () => {
    const { images, title, creator, page } = this.state.post;
    console.log(
      "this is the image length dude",
      images.length,
      page.hero_image_url
    );
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
        console.log("Hero imagesss", heroImages);
        this.setState({ heroImage: heroImages }); //causes infinite loop if you set state in render
      }
    }
  };

  imageTagCreater = images => {
    return images.map(image => {
      return <Image src={image.url} key={image.id} fluid />;
    });
  };

  createParagraphs = () => {
    const { body, images } = this.state.post;
    var mutableImages = [];
    Object.assign(mutableImages, images);
    if (body === null) {
      paragraphBody = "";
    } else {
      var paragraphBody = body.split(/[\r\n\t]+/gm);
    }
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
      console.log("check for undefined", twoImages);
    } // aye you nathan.... finish this up please... you just need to finish this loop like the one above

    const obj = [];
    fourParagraphs.map((paragraphs, index) => {
      console.log("second check for undefined", twoImages[index]);
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
      console.log("objects", object);
      return;
    });

    console.log("images length", this.state.post.images.length);
    console.log("obj length", obj.length);
    var length = obj.length * 2;
    if (images.length > length) {
      // var lastObj = {};
      // Object.assign(lastObj, obj[obj.length - 1]);
      // console.log("lastObj", lastObj);

      obj[obj.length - 1].images = [];
      mutableImages.splice(0, length - 2);
    } else {
      mutableImages = [];
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

    function safeImageLoad(props) {
      if (props.length === 2) {
        return <RightImage imageSRC={props[1].url} />;
      } else {
        return <div />;
      }
    }

    console.log("basic object length", basicObject);
    return basicObject.map(objects => {
      console.log("objects in da map", objects);
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
    console.log("heroImage length", this.state.heroImage.length);
    if (images.length === 0) {
      if (this.state.heroImage.length === 1) {
        console.log("dis female dog was called", this.state.heroImage);
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
