import React from 'react';
import XLSX from 'xlsx';
import styled from 'styled-components';


const ExcelComponent = (props) => {
  console.log("ExcelComponent");
  const workbook = XLSX.read(new Uint8Array(props.data), {
    type: 'array',
  });
  console.log("workbook",workbook);

  const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
  console.log("first_worksheet",first_worksheet);

  const data = XLSX.utils.aoa_to_sheet(first_worksheet, {header:1});
  console.log("data",data);

// sheet_to_json

  return (
    <Container>
      <Text>Hello World!</Text>
    </Container>
  )

}

export default ExcelComponent;

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

