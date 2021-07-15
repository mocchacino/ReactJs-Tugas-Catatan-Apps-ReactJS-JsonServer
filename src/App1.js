import React, {Component, useEffect, useState} from "react";
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Grid,
  Form,
  Table,
  Header,
  Segment,
  Pagination,
  Divider,
  Input,
  Message,
} from 'semantic-ui-react'

import HeaderLeft from "./Component/HeaderLeft";
import HeaderRight from "./Component/HeaderRight";
import ShowTable from "./Component/ShowTable";
import PaginationComponent from "./Component/PaginationComponent";
import ShowHideViewComponent from "./Component/ShowHideViewComponent";
import ShowHideEditComponent from "./Component/ShowHideEditComponent";
import ShowCreateComponent from "./Component/ShowCreateComponent";
import HeaderTitle from "./Component/HeaderTitle";
import SearchComponent from "./Component/SearchComponent";

// const SearchComponent = (props) =>{
//     return (
//         <Segment.Group>
//             <Input 
//                 fluid
//                 value={props.value}
//                 onChange={props.onChange}
//                 placeholder='Cari Judul'
//                 icon='search'
//                 iconPosition='left'
//             />
//         </Segment.Group>
//     )
// }
  
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

  const MsgKosong={
    header: "WARNING!"
  }

const App1 = () => {
    const [dataApi, setDataApi] = useState([]);
    const [edit, setEdit] = useState('Simpan');
    const [dataPost, setDataPost] = useState({
        id: 0,
        judul:'',
        isi:'',
        date:''
    });
    const [filter, setFilter] = useState('');
    const [showHideView, setShowHideView] = useState('Off');
    const [showHideEdit, setShowHideEdit] = useState('Off');
    const [showCreate, setShowCreate] = useState('Off');
    const [page, setPage] = useState(1);
    const [success, setSuccess] = useState('Off');
    const [deleted, setDeleted] = useState('Off');
    const [inputKosong, setInputKosong] = useState('');


    const cancelEdit = () =>{
      setShowHideView('Off'); setShowHideEdit('Off'); setShowCreate('Off'); setSuccess('Off'); setDeleted('Off'); setSuccess('Off'); setDeleted('Off')
      reloadData()
    }
    
    // FUNGSI DELETE
    // mengubah state delete menjadi true, yang akan digunakan untuk menampilkan msg
    // fetch request dengan metode delete
    // selanjutnya jika suces akan menjalankan realoadData 
    const handleRemove = (e) =>{
      const warning = window.confirm("Apakah anda yakin untuk menghapus catatan ini?")
      if (warning === true){
        axios.delete(`http://localhost:3004/list-catatan/${e.target.value}`)
        .then(res => {reloadData()})
        if((showCreate==='On')||(showHideEdit==='On')||(showHideView==='On')){
            setShowHideView('Off'); setShowHideEdit('Off'); setShowCreate('Off')
        }
        setDeleted('On')
      }
    } 

    // membuat request dengan metode get ke url
    // saat berhasil akan mengubah state dataApi menjadi data respon
    const reloadData = () => {
        axios.get('http://localhost:3004/list-catatan').then(
            res => {
                setDataApi(res.data)
            }
        )
    }

    const clearData = () =>{
        let newdataPost = {...dataPost}
        newdataPost['id'] = ''
        newdataPost['judul']=''
        newdataPost['isi']=''
        setDataPost(newdataPost)
    }

    const inputChange = (e, {name, value}) => {
        // mengambil seluruh properti dati dataPost ke variabel newwdatapost
        const newdataPost = {...dataPost}
        const separator = " - "
        const newDate = new Date()
        const date = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
    
        if(edit === 'Simpan'){
          // id berisikan milisecond dari 1 januari 1970 sampai sekarang
          newdataPost['id'] = new Date().getTime()
          // mengisi date menjadi format yyyy-mm-dd
          newdataPost['date'] = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }
        // mengisikan properti newdatapost dengan value
        newdataPost[name] = value
    
        // mengubah properti datapost 
        setDataPost(newdataPost)
    } 

    const onSubmitForm = () =>{
        // jika membuat data baru
        if(edit === 'Simpan'){
          let trimJudul = dataPost.judul.trim();
          let trimIsi = dataPost.isi.trim();
          if(trimJudul === ''){
              if(trimIsi === ''){
                  setInputKosong('Judul dan Isi Tidak boleh Kosong')
              }else{
                  setInputKosong('Judul Tidak boleh Kosong')
              }
          }else if(trimIsi === ''){
              setInputKosong('Isi Tidak boleh Kosong')
          }else{
              // membuat request dengan metode post ke url 
              // jika berhasil akan mereload dan memberishkan Form
              axios
              .post(`http://localhost:3004/list-catatan`, dataPost)
              .then ( () => {
                  reloadData()
                  clearData()
              })
              if((showHideView === 'On') || (showHideEdit === 'On')|| (deleted === 'On') || (success==='On')){
                setShowHideView('Off'); setShowCreate('Off'); setSuccess('Off'); setDeleted('Off'); setDeleted('Off'); setShowHideEdit('Off');
              }
              // state yg digunakan sebagai tanda untuk menampilkan pesan
              setSuccess('On')
          }
        }else{
          // membuat request dengan metode put ke url
          axios
          .put(`http://localhost:3004/list-catatan/${dataPost.id}`, dataPost)
          .then ( () => {
              reloadData()
              clearData()
            }
          )
          setEdit('Simpan')
          setSuccess('On')
        }
    }

    const getDataId = (e) =>{
        // axios mengirim det request ke url
        // hasil respon tersebut disimpan ke variabel res
        // mengubah state datapost dengan Response, state edit dengan true
        axios
        .get(`http://localhost:3004/list-catatan/${e.target.value}`)
        .then(res => 
            setDataPost(res.data),
            setEdit('Edit')
        )
        // mengubah state untuk menampilkkan segment/form
        if((showHideView === 'On') || (showCreate === 'On')|| (deleted === 'On') || (success==='On')){
          setShowHideView('Off'); setShowCreate('Off'); setSuccess('Off'); setDeleted('Off'); setSuccess('Off'); setDeleted('Off')
        }
        setShowHideEdit('On')
    }

    const hideComponent = (e) =>{
        axios
        .get(`http://localhost:3004/list-catatan/${e.target.value}`)
        .then(res => 
            setDataPost(res.data),
            // setEdit('Edit')
        )
        if((showHideEdit === 'On') || (showCreate === 'On')|| (deleted === 'On') || (success==='On')){
          setShowHideEdit('Off'); setShowCreate('Off'); setSuccess('Off'); setDeleted('Off'); setSuccess('Off'); setDeleted('Off')
        }
        setShowHideView('On')
    }

    const showingCreate = () =>{
        if((showHideEdit === 'On') || (showHideView === 'On') || (deleted === 'On') || (success==='On')){
          setShowHideEdit('Off'); setShowHideView('Off'); setSuccess('Off'); setDeleted('Off'); setSuccess('Off'); setDeleted('Off')
        }
        clearData()
        setShowCreate('On')
    }
      
    useEffect( () => {
        // reloadData();
        handleFilter()
    }, [filter])

    const setPageNum = (event, { activePage }) => {
        setPage(activePage)
    }

    // untuk mendapatkan data yang match dengan keyword
    // keyword dan data yg tersedia diubah menjadi lower cased
    // selanjutnya digunakan fungsi filter

    const handleFilter = () =>{
        setPage(1)
        const lowerCastedFilter = filter.toLowerCase();
        if(lowerCastedFilter === ''){
            reloadData()
        }
        const filteredData = 
              dataApi.filter(catatan => {
                  return catatan.judul.toLowerCase().includes(lowerCastedFilter)
              });
        setDataApi(filteredData)
    }

    const itemsPerPage = 3;
    // memotong array sehingga menimpalkan sesuai jumlah itemsperpage
    const items  = dataApi.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
    );

    return(
        <div>
        <Grid>
          <Grid.Row color='grey' centered>
              <Grid.Column mobile={8} tablet={4} computer={4} >
                  <HeaderLeft/>
              </Grid.Column>
              <Grid.Column mobile={4} tablet={8} computer={8} ></Grid.Column>
              <Grid.Column mobile={4} tablet={4} computer={4} >
              <HeaderRight/>
              </Grid.Column>
          </Grid.Row>
          <Grid.Row mobile={14} tablet={14} computer={14} centered>
            <HeaderTitle/>
          </Grid.Row>
          <Grid.Row centered>            
          <Grid.Column mobile={14} tablet={14} computer={14} >
              <Segment.Group>
                <Segment as='h5'>Catatan</Segment>
                <SearchComponent 
                    value={filter}
                    onChange={e => {
                      setFilter(e.target.value)
                    }}
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
                          <ShowTable 
                          catatan = {catatan}
                          hideComponent = {hideComponent}
                          getDataId = {getDataId}
                          handleRemove = {handleRemove}
                          />
                        )
                      })} 
                      </Table.Body>
                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan='3'>
                            <PaginationComponent 
                              dataApi = {dataApi}
                              page={page} 
                              itemsPerPage = {itemsPerPage}
                              onPageChange={setPageNum}
                            />
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                    <Button onClick={showingCreate} color='blue'>Create</Button>
                  </Segment>
                  
                  <Segment>
                    <Form>
                      {(deleted === 'On') ? <MessageDelete header={MsgDelete.header} content={MsgDelete.content} /> : <br/>}
                      {(showHideView === 'On') ? 
                        <ShowHideViewComponent
                          dataPost={dataPost}
                        />
                      : <br/>}
                      {(showHideEdit === 'On') ? (
                        <div>
                          {(success === "On") && <MessageSuccess header={MsgSuccess.header} content={MsgSuccess.content} />}
                          <ShowHideEditComponent
                            dataPost={dataPost}
                            onChange={inputChange}
                            saveEdit={onSubmitForm}
                            cancelEdit={cancelEdit}
                          />
                        </div>
                      ): <br/>}
                      {(showCreate === 'On') ? (
                        <div>
                          {(success === "On") && <MessageSuccess header={MsgSuccess.header} content={MsgSuccess.content} />}
                          { (inputKosong !== '') && <MessageDelete header={MsgKosong.header} content={inputKosong}/>}
                          <ShowCreateComponent
                            dataPost={dataPost}
                            onChange={inputChange}
                            onClick={onSubmitForm}
                          />
                        </div>
                      ): <br/>}
                    </Form>
                  </Segment>
                </Segment.Group>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div> 
    )
}
export default App1;