import React, {useState, useEffect, useContext} from 'react'
import {Form, Button, Modal, Col, Row, Container, Spinner} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';

const EditPost = (props) => {
    const postContext = useContext(PostContext)
    
    const {updatePost, loading,  getUserPost, post, current} = postContext;
    
    const [update, setUpdate] = useState({
        
        title: '',
        body: current && current.body || props.location.state.body
    });

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {  
        setShow(false);
        props.history.push('/user-posts')
    }
    const handleShow = () => setShow(true);

    const blocksFromHtml = htmlToDraft(update.body);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))


    const toolbarOptions = ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 
    'link', 'embedded',  'history'];
    
    const onEditorStateChange = editorState => {
        let convertedBody = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))

        setUpdate({
            ...post,
            title: post.title,
            body: convertedBody
        })
        setEditorState(editorState);
    }

    const onChange =(e) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        })
    }

   const onSubmit =(e) => {
       e.preventDefault()
       if(post !== null) {
        updatePost(update)   
        setValidated(true)
        props.history.go(2)
       }
       
   }

   useEffect(() => {
    
     handleShow();
       
    if(validated) {
        handleClose();
    }
       
       if(current !== null) {
        getUserPost(props.match.params.id)
        setUpdate(current) 
       }  else {
           getUserPost(props.match.params.id)
           setUpdate(props.location.state)
       }

     // eslint-disable-next-line 
}, [validated, current, loading])

if(post !== null && loading) {
    return (
    <Container className='loading'>
        <Spinner animation='border' size='large' />
    </Container>
    )
} else {
    return (
       
        <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-center'>Edit Story</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
            <Modal.Body>
            
                              <Form.Row className='my-5'>
                                  <Col md={1} className='d-flex'>
                                  <h5 className='my-auto'>Title</h5>
                                  </Col>
                                  <Col md={6} >
                                    <Form.Control 
                                    name='title'
                                    type='text'
                                    onChange={onChange}
                                    value={update && update.title}
                                    placeholder='Enter a title...'
                                    maxLength='75'
                                    />
                                  </Col>
                              </Form.Row>
                              <Row className='mb-4'>
                                  <Col>
                                <Editor
                                  editorState={editorState}
                                  wrapperClassName="rich-editor"
                                  editorClassName="Draft-editor-wrapper"
                                  onEditorStateChange={onEditorStateChange}
                                  toolbarClassName='toolbar'
                                  toolbar={{
                                    options: toolbarOptions,
                                    
                                    inline: { 
                                        options: ['bold', 'italic', 'strikethrough']
                                    },
                                    fontSize: {
                                        options: [14, 16, 18, 24]
                                    },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true }
                                  }}
                                />
                                  </Col>
                              </Row>
                            
            </Modal.Body>
            <Modal.Footer>
        <Button  className='px-4 d-flex ml-auto' type='submit'><strong>Update</strong></Button> 
            </Modal.Footer>  
            </Form>
        </Modal>
       
    )
                                }                                               
}

export default EditPost
