import React from "react"
import 'semantic-ui-css/semantic.min.css'
import {
  Form,
  Button,
  Container
} from 'semantic-ui-react'

const ShowHideEditComponent = (props) =>{
    return(
        <div>
            <Form.Group>
                <Form.Input fluid label='Judul' type='text' name='judul' placeholder='Masukkan Judul' value={props.dataPost.judul} onChange={props.onChange} width={16}/>
                </Form.Group>
                <Form.Group>
                <Form.TextArea fluid label='Isi Catatan' name='isi' placeholder="Isi" value={props.dataPost.isi} onChange={props.onChange} width={16}/>
            </Form.Group>
            <br/>
            <Container fluid textAlign='right'>
                <Button onClick={props.cancelEdit}>Cancel</Button>
                <Button type='submit' onClick={props.saveEdit} primary>Save Catatan</Button>
            </Container>
            
        </div>
    )
}

export default ShowHideEditComponent;