import React, { Component } from 'react';
import styled from 'styled-components';


class ImageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      height: null,
      width: null,
    }
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  handleImageLoad({ target: image }) {
    this.setState({
      height: image.offsetHeight,
      width: image.offsetWidth
    });
  }


  render() {

    const { height, width } = this.state;

    return (
      <ImageContainer>
        <Image onLoad={ this.handleImageLoad } src={this.props.source} />
        { width && height &&
        <Details>
          Image width: {width}px and Image height: {height}px
        </Details>
        }
      </ImageContainer>
    )
  }

}


export default ImageComponent;


const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const Details = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 15px;
  text-align: left;
`;



/*
import React from 'react';
import styled from 'styled-components'


const ImageComponent = (props) => {
  return (
    <ImageContainer>
      <Image src={props.source} />
    </ImageContainer>
  )
}

export default ImageComponent;


const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 5px;
`;

*/
