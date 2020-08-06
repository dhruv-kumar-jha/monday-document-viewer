import React, { Component } from 'react';
import styled from 'styled-components';


class WordComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userConsent: false,
    }
    this.userConsent = this.userConsent.bind(this);
  }

  userConsent() {
    this.setState({ userConsent: true })
  }


  render() {

    if ( ! this.state.userConsent ) {
      return (
        <Container>
          <Text>We cannot display word documents natively. However we can display the document by embedding it in document viewer provided by Microsoft</Text>
          <Notification>
            Doing this, Your document will be uploaded to the microsoft server
            <Button onClick={ this.userConsent }>Yes, Upload and Show</Button>
          </Notification>
        </Container>
      )
    }

    const url = `https://view.officeapps.live.com/op/embed.aspx?src=${this.props.source}`;
    console.log("url",url);

    return (
      <Container>
        <Word src={url} frameborder="0" />
      </Container>
    )

  }

}


export default WordComponent;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: center;

`;


const Text = styled.p`
  font-size: 24px;
  line-height: 100%;
  margin-top: 10px;
  width: 60%;
`;

const Notification = styled.p`
  font-size: 18px;
  line-height: 100%;
  margin-top: 10px;
  width: 60%;
  margin-top: 20px;
  background: #fff6aa;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #FFF;
`;

const Word = styled.iframe`
  min-width: 80vw;
  min-height: 90vh;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  background: #000;
  font-size: 14px;
  padding: 10px;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 4px;

  &:hover {
    background: #ff0000;
  }

`;



/*

const WordComponent = (props) => {
  console.log("props",props);
  // const googleUrl = `https://docs.google.com/gview?url=${props.source}&embedded=true`;
  const url = `https://view.officeapps.live.com/op/embed.aspx?src=${props.source}`;
  console.log("url",url);

  return (
    <Container>
      <Word src={url} frameborder="0" />
    </Container>
  )
}

export default WordComponent;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: top;
`;

const Word = styled.iframe`
  min-width: 80vw;
  min-height: 90vh;
  width: 100%;
  height: 100%;
`;
*/
