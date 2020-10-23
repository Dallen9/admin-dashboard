import React, {useContext, useEffect} from 'react'
import {Container, Spinner, Col, Row} from 'react-bootstrap';
import PostContext from '../../context/post/postContext';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';


const PostDetail = (props) => {
    const postContext = useContext(PostContext);
    const {loading, post, getUserPost} = postContext;

 
  const editedBody = (body) => {
      if(!loading && post) {
        const blocksFromHtml = htmlToDraft(body);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
          return (
            <>
                <Editor
                    //   wrapperClassName="rich-editor"
                    //   editorClassName="Draft-editor-wrapper"
                    editorState={editorState}
                    editorContent={contentState}
                    toolbarHidden 
                    readOnly
                />
            </>
          )
      }

  }

    useEffect(() => {
        getUserPost(props.match.params.id)
        //eslint-disable-next-line
    }, [])

    if(post !== null && post.length === 0 && !loading) {
        return <h4> Post unavailable</h4>
    }

    if(loading && post !== null) {
        return (
        <Container className='loading'>
            <Spinner animation='border' size='large' />
        </Container>
        )
    } else {
    return (
        
        <Container>
            <Row className='mt-5'>
                <Col>
                <h1>{post && post.title}</h1>
                </Col>
            </Row>
            <Row className='mt-3 pl-3'>
                <Col>
                <small style={{color: 'black'}}> by <strong>Name on</strong> {post && post.date} </small>

                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                        <p>{editedBody(post && post.body)}</p>
                </Col>
            </Row>
        </Container>
    )
    }
}

export default PostDetail
