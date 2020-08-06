import React from 'react';
import XLSX from 'xlsx';
import styled from 'styled-components';
import ExcelTable from './ExcelTable';


const ExcelComponent = (props) => {

  const workbook = XLSX.read( props.data, {
    type: 'array',
  });
  const first_sheet_name = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[first_sheet_name];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  return (
    <Container>
      { jsonData && jsonData.length > 0 && <ExcelTable data={jsonData} /> }
      { jsonData && jsonData.length <= 0 && <Text>This CSV file doesn't contain any data.</Text> }
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

