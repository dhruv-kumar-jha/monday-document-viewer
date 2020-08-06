import React from 'react';
import styled from 'styled-components';


const PDFComponent = (props) => {
  let base64String = btoa(String.fromCharCode(...props.data));
  return (
    <Container>
      <PDF src={`data:application/pdf;base64,${base64String}`} />
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
