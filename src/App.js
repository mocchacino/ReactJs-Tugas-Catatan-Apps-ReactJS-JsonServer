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
  Pagination,
  Divider,
  Input,
  Message,
} from 'semantic-ui-react'

const SearchComponent = (props) =>{
  return (
      <Segment.Group>
          <Input 
              fluid
              value={props.value}
              onChange={props.onChange}
              placeholder='Cari Judul'
          />
      </Segment.Group>
  )
}

function MessageSuccess(props){
  return(
    <Message positive>
      <Message.Header>{props.header}</Message.Header>
      <p>
        {props.content}
      </p>
    </Message>
  )
}

function MessageDelete(props){
  return(
    <Message negative>
      <Message.Header>{props.header}</Message.Header>
      <p>
        {props.content}
      </p>
    </Message>
  )
}

const MsgSuccess={
  header: "Sukses!",
  content:"Catatan penting kamu sudah kami simpan."
}

const MsgDelete={
  header: "Sukses!",
  content:"Catatan penting kamu sudah kami hapus."
}



class App extends Component{
  constructor(props){
    super(props)
    this.state={
      dataApi:[],
      edit:false,
      dataPost:{
        id:0,
        judul:'',
        isi:'',
        date:''
        
      },
      filter:'',
      showHideView: false,
      showHideEdit: false,
      showCreate: false,
      page:1,
      success:false,
      delete:false
    }
    this.handleRemove=this.handleRemove.bind(this)
    this.inputChange=this.inputChange.bind(this)
    this.onSubmitForm=this.onSubmitForm.bind(this)
    this.hideComponent=this.hideComponent.bind(this)
    this.showCreate=this.showCreate.bind(this)
    this.clearData=this.clearData.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }


  // FUNGSI DELETE
  // mengubah state delete menjadi true, yang akan digunakan untuk menampilkan msg
  // fetch request dengan metode delete
  // selanjutnya jika suces akan menjalankan realoadData 
  handleRemove(e){
    this.setState({delete:true})
    fetch(`http://localhost:3004/list-catatan/${e.target.value}`, {
      method:"DELETE"
    }).then(res => this.reloadData())
    
  }

  // membuat request dengan metode get ke url
  // saat berhasil akan mengubah state dataApi menjadi data respon
  reloadData(){
    axios.get('http://localhost:3004/list-catatan').then(
      res => {
        this.setState({
          dataApi:res.data
        })
      }
    )
  }

  clearData = () =>{
    let newdataPost = {...this.state.dataPost}
    newdataPost['id'] = ''
    newdataPost['judul']=''
    newdataPost['isi']=''

    this.setState({
      dataPost: newdataPost
    })
  }

  inputChange(e, {name, value}){
    // this.setState({ value })
    // mengambil seluruh properti dati dataPost ke variabel newwdatapost
    let newdataPost = {...this.state.dataPost}
    let separator = " - "
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    if(this.state.edit === false){
      // id berisikan milisecond dari 1 januari 1970 sampai sekarang
      newdataPost['id'] = new Date().getTime()
      // mengisi date menjadi format yyyy-mm-dd
      newdataPost['date'] = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
    // mengisikan properti newdatapost dengan value
    newdataPost[name] = value

    // mengubah properti datapost 
    this.setState({
      dataPost : newdataPost
    }, 
    () => console.log(this.state.dataPost))
  }

  handleChange(event){
    this.setState({ 
      filter: event.target.value, 
      page : 1 
    });
  };

  componentDidMount(){
    this.reloadData()
  }

  onSubmitForm(){
    // jika membuat data baru
    if(this.state.edit === false){
      // membuat request dengan metode post ke url 
      // jika berhasil akan mereload dan memberishkan Form
      axios
      .post(`http://localhost:3004/list-catatan`, this.state.dataPost)
      .then ( () => {
          this.reloadData()
          this.clearData()
        }
      )
      // state yg digunakan sebagai tanda untuk menampilkan pesan
      this.setState({success:true});
    }else{
      // membuat request dengan metode put ke url
      axios
      .put(`http://localhost:3004/list-catatan/${this.state.dataPost.id}`, this.state.dataPost)
      .then ( () => {
          this.reloadData()
          this.clearData()
        }
      )
      this.setState({success:true});
    }
  }

  getDataId = (e) =>{
    // axios mengirim det request ke url
    // hasil respon tersebut disimpan ke variabel res
    // mengubah state datapost dengan Response, state edit dengan true
    axios
    .get(`http://localhost:3004/list-catatan/${e.target.value}`)
    .then(res => 
      this.setState({
        dataPost: res.data,
        edit: true
      })
    )
    // mengubah state untuk menampilkkan segment/form
    if((this.state.showHideView) || (this.state.showCreate)){
      this.setState({showHideView: false, showCreate: false, success:false, delete:false});
    }
    this.setState({showHideEdit: true});
  }

  hideComponent = (e) =>{
    axios
    .get(`http://localhost:3004/list-catatan/${e.target.value}`)
    .then(res => 
      this.setState({
        dataPost: res.data,
        edit: true
      })
    )
    if((this.state.showHideEdit) || (this.state.showCreate)){
      this.setState({showHideEdit: false, showCreate: false, success:false, delete:false});
    }
    this.setState({showHideView: true});
  }

  showCreate(){
    if((this.state.showHideEdit) || (this.state.showHideView)){
      this.setState({showHideEdit: false, showHideView: false, success:false, delete:false});
    }
    this.clearData()
    this.setState({showCreate: !this.state.showCreate});
  }
  
  
  setPageNum = (event, { activePage }) => {
    this.setState({ page: activePage });
  };
   

  render(){
    const { showHideView, showHideEdit, showCreate, filter } = this.state;
    // untuk mendapatkan data yang match dengan keyword
    // keyword dan data yg tersedia diubah menjadi lower cased
    // selanjutnya digunakan fungsi filter
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = this.state.dataApi.filter(catatan => {
      return catatan.judul.toLowerCase().includes(lowercasedFilter)
    });
    
    const itemsPerPage = 3;
    const totalPages = Math.ceil((Object.keys(filteredData).length)/itemsPerPage);
    const { page } = this.state;
    
    const items  = filteredData.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    );

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
                <Segment as='h5'>Catatan</Segment>
                <SearchComponent 
                    value={filter}
                    onChange={this.handleChange}
                />
                <Segment.Group>
                  <Segment>
                    <Table celled striped>
                      <Table.Header>
                        <Table.Row textAlign='center'>
                          <Table.HeaderCell width={2}>Tanggal</Table.HeaderCell>
                          <Table.HeaderCell>Judul</Table.HeaderCell>
                          <Table.HeaderCell width={4}>Action</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                      {items.map(catatan=> {
                        return(
                          <Table.Row key={catatan.id}>
                            <Table.Cell textAlign='center'>
                              {catatan.date}
                            </Table.Cell>
                            <Table.Cell>{catatan.judul}</Table.Cell>
                            <Table.Cell textAlign='center'>
                              <Button value={catatan.id} onClick={this.hideComponent} color='green'>View</Button>
                              <Button value={catatan.id} onClick={this.getDataId} color='blue'>Edit</Button>
                              <Button value={catatan.id} onClick={this.handleRemove} color='red'>Delete</Button>
                            </Table.Cell>
                          </Table.Row>
                        )
                      })} 
                      </Table.Body>
                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan='3'>
                            <Pagination 
                              activePage={page} 
                              totalPages={totalPages} 
                              onPageChange={this.setPageNum}
                              siblingRange={1}
                            />
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                    <Button onClick={this.showCreate} color='blue'>Create</Button>
                  </Segment>
                  
                  <Segment>
                    <Form>
                      {this.state.delete && <MessageDelete header={MsgDelete.header} content={MsgDelete.content} />}
                      {showHideView && (
                        <div>
                          <Segment>
                            <Header as='h3' floated='left'>
                              <p>{this.state.dataPost.judul}</p>
                            </Header>
                            <Divider clearing />
                              <p>{this.state.dataPost.isi}</p>
                          </Segment>
                         
                        </div>
                      )}
                      {showHideEdit && (
                        <div>
                          {this.state.success && <MessageSuccess header={MsgSuccess.header} content={MsgSuccess.content} />}
                          <Form.Group>
                            <Form.Input fluid label='Judul' type='text' name='judul' placeholder='Masukkan Judul' value={this.state.dataPost.judul} onChange={this.inputChange} width={16}/>
                          </Form.Group>
                          <Form.Group>
                            <Form.TextArea fluid label='Isi Catatan' name='isi' placeholder="Isi" value={this.state.dataPost.isi} onChange={this.inputChange} width={16}/>
                          </Form.Group>
                          <Button fluid type='submit' onClick={this.onSubmitForm} primary>Save Catatan</Button>
                        </div>
                      )}
                      {showCreate && (
                        <div>
                          {this.state.success && <MessageSuccess header={MsgSuccess.header} content={MsgSuccess.content} />}
                          <Form.Group>
                            <Form.Input fluid label='Judul' type='text' name='judul' placeholder='Masukkan Judul' value={this.state.dataPost.judul} onChange={this.inputChange} width={16}/>
                          </Form.Group>
                          <Form.Group>
                            <Form.TextArea fluid label='Isi Catatan' name='isi' placeholder="Isi" value={this.state.dataPost.isi} onChange={this.inputChange} width={16}/>
                          </Form.Group>
                          <Button fluid type='submit' onClick={this.onSubmitForm} primary>Create Catatan</Button>
                        </div>
                      )}
                    </Form>
                  </Segment>
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
export default App;
