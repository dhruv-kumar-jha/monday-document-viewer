import React from 'react';
import styled from 'styled-components';

const Table = (props) => {

  console.log("props.data", props.data);




  return (
    <Container>
      <table>
        <tbody>
          { props.data.map( (item, index) => {
            return (
              <ItemContainer key={index}>
                { item && item.length > 0 && item.map( (column, index) => {
                  if ( column ) {
                    return <Item key={index}>{ column }</Item>
                  }
                }) }
              </ItemContainer>
            )
          }) }
        </tbody>
      </table>
    </Container>
  )

}


export default Table;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: top;
`;

const ItemContainer = styled.tr`
  padding: 10px;
  background: #eee;
`;

const Item = styled.td`
  padding: 10px;
  background: #eee;
  border: 1px solid #ccc;
`;
