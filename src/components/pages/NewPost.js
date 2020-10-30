import React, {useContext, useState} from 'react'
import {Container, Row, Col, Button, Card, Form, Alert} from 'react-bootstrap';
import { EditorState, convertToRaw } from 'draft-js';	
import { Editor } from 'react-draft-wysiwyg';
import PostContext from '../../context/post/postContext';
import draftToMarkdown from 'draftjs-to-markdown';

const NewPost = (props) => {
 
    const postContext = useContext(PostContext);

    const {addPost} = postContext;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [post, setPost] = useState({
        title: '',
        body: ''
    });
    const [success, setSuccess] = useState(false)
    

    const onEditorStateChange = editorState => {
        let convertedBody = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))

        setPost({
            title: post.title,
            body: convertedBody
        })

        setEditorState(editorState);
    }

    const toolbarOptions = ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 
    'link', 'embedded',  'history'];

    const onChange =(e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
const successMsg = () => {
    return (
        <Alert variant='success'>
            <p className='d-flex my-auto mx-auto'>You have successfully created a blog!</p>
        </Alert>
    )
}
    const onSubmit = (e) => {
        e.preventDefault();

        if(post.title !== '' && post.body !== '') {
                addPost(post)
                setPost({title: ''})
                setEditorState(EditorState.createEmpty());
                setSuccess(true)
            setTimeout(() => {
                props.history.push('/blog')
            }, 2000)
        } 
    }
  
    return (
        <>
        <Container  className='my-5'>
        {success && (<div className='mb-3'><Row><Col>{successMsg()}</Col></Row></div>)}
            <Row>
                <Col>
                    <Card>
                        <Card.Title className='d-flex' style={{height: '4rem'}}>
                            <h1 className='px-3 my-auto'>New Story</h1>
                        </Card.Title>
                    </Card>
                </Col>
            </Row>
            <Row className='my-5'>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={onSubmit}>
                              <Form.Row className='my-5'>
                                  <Col md={1} className='d-flex'>
                                  <h5 className='my-auto'>Title</h5>
                                  </Col>
                                  <Col md={6} >
                                    <Form.Control 
                                    name='title'
                                    type='text'
                                    onChange={onChange}
                                    value={post.title}
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
                              <Button   className='px-4 d-flex ml-auto' type='submit'><strong>POST</strong></Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    )
}



export default NewPost
