import React, {Fragment, useContext, useEffect} from 'react'
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
              <div>
                <Editor
                    editorState={editorState}
                    editorContent={contentState}
                    toolbarHidden 
                    readOnly
                />
                </div>
          )
      }

  }

    useEffect(() => {
        getUserPost(props.match.params.id)
        // eslint-disable-next-line
    }, [props, loading])

    if(post !== null && post.length === 0 && !loading) {
        return <h4> Post unavailable</h4>
    }

  
    return (
        <Fragment>
            {post && post._id === props.match.params.id && !loading ? (
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
                            {editedBody(post && post.body)}
                    </Col>
                </Row>
            </Container>
            ) : (
            <Container className='loading'>
            <Spinner animation='border' size='large' />
            </Container>
            )}
        </Fragment>
    )
}

export default PostDetail
