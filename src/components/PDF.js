import React, { Component } from 'react';
import styled from 'styled-components';


const PDFComponent = (props) => {
  return (
    <Container>
      <PDF src={props.source} />
    </Container>
  )
}

export default PDFComponent;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: top;
`;

const PDF = styled.iframe`
  min-width: 80vw;
  min-height: 80vh;
  width: 100%;
  height: 100%;
`;
