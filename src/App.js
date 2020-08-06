import React, { Component } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

// import all the components
import Loading from './components/Loading';
import Image from './components/Image';
import PDF from './components/PDF';
import CSV from './components/CSV';
import JSONData from './components/JSON';
import Excel from './components/Excel';


import Unsupported from './components/Unsupported';
import NotFound from './components/NotFound';



class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      unsupported: null,
      notfound: null,

      file: 'https://file-examples-com.github.io/uploads/2017/10/file_example_PNG_500kB.png',
      fileType: null,
      extension: null,
    }
    this.processFile = this.processFile.bind(this);
  }


  componentDidMount() {
    this.processFile();
  }


  async processFile() {
    const unsupportedFormats = [ 'tiff' ];
    const images = [ 'jpg', 'png', 'gif', 'ico', 'svg', 'webp' ];
    const url = this.state.file;
    const extension = this.getExtension(url);

    // check if the file type can be rendered in browser or not
    if ( unsupportedFormats.includes(extension) ) {
      this.setState({ unsupported: true, extension: extension, loading: false });
      return;
    }

    // if image, our job is done
    if ( images.includes(extension) ) {
      this.setState({ fileType: 'image', extension: extension, loading: false });
      return;
    }

    if ( extension === 'pdf' ) {
      this.setState({ fileType: 'pdf', extension: extension, loading: false });
      return;
    }

    if ( extension === 'csv' ) {
      try {
        const data = await this.fetCSVData(url);
        this.setState({ fileType: 'csv', data: data, extension: extension, loading: false });
      } catch (error) {
        this.setState({ notfound: true, extension: extension, loading: false });
      }
      return;
    }

    if ( extension === 'json' ) {
      try {
        const data = await fetch(url);
        const dataJson = await data.json();
        this.setState({ fileType: 'json', data: dataJson, extension: extension, loading: false });
      } catch (error) {
        this.setState({ notfound: true, extension: extension, loading: false });
      }
      return;
    }

    if ( extension === 'xls' ) {
      try {
        const res = await fetch(url);
        const data = res.arrayBuffer();
        console.log("data",data);
        this.setState({ fileType: 'excel', data: data, extension: extension, loading: false });
      } catch (error) {
        this.setState({ notfound: true, extension: extension, loading: false });
      }
      return;
    }




    this.setState({ unsupported: true, extension: extension, loading: false });
  }



  getExtension(file) {
    return file.split('.').pop();
  }

  async fetCSVData(url) {
    return new Promise( (resolve, reject) => {
      const data = [];
      Papa.parse(  url, {
        download: true,
        step: (results, parser) => {
          data.push(results.data);
        },
        complete: (results, file) => {
          resolve(data);
        },
        error: (error, file) => {
          reject(error);
        }
      });
    });
  }



  render() {

    if ( this.state.loading ) {
      return <Loading text="Loading..." />
    }

    if ( this.state.unsupported ) {
      return <Unsupported extension={this.state.extension} />
    }

    if ( this.state.notfound ) {
      return <NotFound file={this.state.file} />
    }


    const { fileType } = this.state;

    return (
      <Container>
        { fileType && fileType === 'image' &&
          <Image source={this.state.file} />
        }
        { fileType && fileType === 'pdf' &&
          <PDF source={this.state.file} />
        }
        { fileType && fileType === 'csv' &&
          <CSV data={this.state.data} />
        }
        { fileType && fileType === 'json' &&
          <JSONData data={this.state.data} />
        }
        { fileType && fileType === 'excel' &&
          <Excel data={this.state.data} />
        }


      </Container>
    )

  }

}


export default Application;





const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  height: 100%;
  overflow: auto;
  background: #ccc;
`;

/*
  justify-content: center;
  align-items: center;


  border: 1px solid #ccc;
  padding: 20px;

*/
