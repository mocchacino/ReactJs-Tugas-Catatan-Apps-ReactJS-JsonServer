import React from "react"
import 'semantic-ui-css/semantic.min.css'
import {
  Form,
  Button
} from 'semantic-ui-react'

const ShowCreateComponent = (props) =>{
    return(
        <div>
            <Form.Group>
                <Form.Input fluid label='Judul' type='text' name='judul' placeholder='Masukkan Judul' value={props.dataPost.judul} onChange={props.onChange} width={16}/>
                </Form.Group>
                <Form.Group>
                <Form.TextArea fluid label='Isi Catatan' name='isi' placeholder="Isi" value={props.dataPost.isi} onChange={props.onChange} width={16}/>
            </Form.Group>
            <Button fluid type='submit' onClick={props.onClick} primary>Create Catatan</Button>
        </div>
    )
}

export default ShowCreateComponent;