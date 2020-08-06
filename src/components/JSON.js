import React from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';


const JSONComponent = (props) => {

  return (
    <Container>
      <ReactJson src={props.data} enableClipboard={false} />
    </Container>
  )

}

export default JSONComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: top;
`;

const Text = styled.p`
  font-size: 20px;
  line-height: 100%;
  margin-top: 10px;
  max-width: 80%;
`;

/*
theme="solarized"
monokai
solarized
*/
