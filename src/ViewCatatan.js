import React, {Component} from "react";
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Grid,
  Form,
  Table,
  Header,
  Segment,
  Image,
  Menu,
  Icon,
  Search,
} from 'semantic-ui-react'


class ViewCatatan extends Component{
  

  getDataId = (e) =>{
    axios
    .get(`http://localhost:3004/list-catatan/${e.target.value}`)
    .then(res => 
      this.setState({
        dataPost: res.data,
        edit: true
      })
    )
  }

  // const history = useHistory();
//   handleView = () =>{
//       let path = `aaaaa`; 
//       history.push(path);
    
//   }

  componentDidMount(){
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(res => {
    //     this.setState({
    //       dataApi:res
    //     })
    //   })
    this.reloadData()
    
  }
  render(){
    return(
      <div>
        <Grid>
          <Grid.Row></Grid.Row>
          <Grid.Row color='grey' verticalAlign='middle'>
            <Grid.Column width={1}></Grid.Column>

            <Grid.Column width={2}>
              <Header>
                <Image src='https://asset-niomic.s3-ap-southeast-1.amazonaws.com/logo-niomic-black-.png' size='massive' />
              </Header>
            </Grid.Column>
            
            <Grid.Column width={10}></Grid.Column>

            <Grid.Column width={3} contentAlign='left' >
              <Header as='h5' >
                <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' size='small' verticalAlign='middle'/> 
                <span>Wiladhianty</span>
              </Header>
            </Grid.Column>
          
            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            
            <Grid.Column width={14}>
            <Segment.Group>
                <Segment>View Catatan</Segment>
                <Segment.Group>
                    <Form>
                      <Form.Group>
                        <Form.Input disabled fluid label='Jabatan' type='text' name='judul' placeholder='Masukan Judul' value={this.post.dataPost.judul} width={16}/>
                      </Form.Group>
                      <Form.Group>
                        <Form.TextArea disabled fluid label='Isi Catatan' name='isi' placeholder="Isi" value={this.post.dataPost.isi} width={16}/>
                      </Form.Group>
                    </Form>
                </Segment.Group>
            </Segment.Group>
            
            </Grid.Column>

            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>

          
        </Grid>
      </div>
        
        
        

      
    )
  }
}
export default ViewCatatan;
