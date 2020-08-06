import React from 'react';
import styled from 'styled-components';


const abToBase64 = ( buffer ) => {
  let binary = '';
  let bytes = new Uint8Array( buffer );
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}


const PDFComponent = (props) => {
  // let base64String = btoa(String.fromCharCode(...props.data));
  const base64String = abToBase64(props.data);

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
