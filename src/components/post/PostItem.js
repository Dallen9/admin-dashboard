import React from 'react'
import {Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import stock from '../../assets/stock.jpg';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

const PostItem = ({post}) => {
    const truncate = (post, size) => {
        return post.length > size ? post.slice(0, size - 1) + "…" : post;
    }

    const blocksFromHtml = htmlToDraft(truncate(post.body, 99));
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    
    return (
       <>
        <Card key={post._id} className='mb-5' style={{height: '26rem'}}  >
            <Link style={{color: 'black', height: '100%'}} to={'/detail/' + post._id} >
            <Card.Img variant= 'top' className='card-img' src={stock} alt='stock'/>
            <Card.Body>
            <h5>{truncate(post.title, 36)}</h5>
            <small className='text-muted'>{post.date}</small>
            <h6 style={{textTransform: 'capitalize', marginBottom: '0 !important'}}>By {post.user.name}</h6>
                <div className='draft-editor-wrapper'>
                <Editor
                    wrapperClassName="editor-item"
                    editorClassName=".draftEditor-editorContainer"
                    editorState={editorState}
                    editorContent={contentState}
                    toolbarHidden 
                    readOnly 
                />
                </div>
            </Card.Body>
            </Link>
        </Card>   
         </>       
    )
}

export default PostItem
