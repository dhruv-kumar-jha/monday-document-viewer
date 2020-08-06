import React from 'react';
import styled from 'styled-components';

const ExcelTable = (props) => {

  const header = Object.keys(props.data[0]);


  return (
    <Container>
      <table>
        <thead>
          <tr>
            { header && header.map( (name, index) => {
              return <Header key={index}>{name === '__EMPTY' ? '' : name }</Header>
            } ) }
          </tr>
        </thead>
        <tbody>
          { props.data.map( (item, index) => {
            return (
              <ItemContainer key={index}>
                { item && Object.values(item).map( (column, index) => {
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


export default ExcelTable;

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

const Header = styled.td`
  padding: 10px;
  background: #000;
  color: #fff;
  border: 1px solid #ccc;
`;

const Item = styled.td`
  padding: 10px;
  background: #eee;
  border: 1px solid #ccc;
`;
