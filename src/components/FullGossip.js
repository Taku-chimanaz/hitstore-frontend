import React, { useState, useEffect} from 'react'
import Header from './Header';
import './../css/FullGossip.css';
import backArrow from "./../imgs/backarrow.png";
import { backendUrl } from '../js/data';
import {Link, useParams} from 'react-router-dom';
import { ResponseMessage } from './Products';
import { handleResponse } from '../js/handleResponses';


function FullGossip() {

    const gossip = JSON.parse(useParams().gossip);
    const [comments, setComments] = useState([]);
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: true,
        message: "Fetching comments",
        color: ""
    })
    
    useEffect(() =>{

        fetch(`${backendUrl}/api/comments/get-gossip-comments/${gossip._id}`)
        .then(res => res.json())
        .then(result => {
            
            handleResponse(
                result.message,
                result.comments,
                statusMessageOpts,
                setStatusMessageOpts,
                setComments
            )
        })
        .catch(() => {
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                null
            )
        })

    },[]);

  return (
    
    <>  
        <Header active={"phoshto"}/>
         <section className='full-gossip'>
            <LeftSide/>
            <GossipSection gossip={gossip} comments={comments} setComments={setComments} statusMessageOpts={statusMessageOpts} setStatusMessageOpts={setStatusMessageOpts}/>
            <RightSide/>
        </section>
    </>
  )
}

const LeftSide = () => {

    return(

        <section className="left-side">
            <p>This is the left side</p>
        </section>
    )
}

const GossipSection = ({gossip, comments, setComments, statusMessageOpts, setStatusMessageOpts}) => {

    return(

        <article className="gossip-section">

            <div className="backarrow-container">
                <Link to="/phoshto">
                    <img src={backArrow} alt="back arrow" />
                </Link>
            </div>

           <div className="the-gossip">
                <div className="gossip-img-container">
                    <img src={`${backendUrl}/general/get-image/${gossip.image}`} alt="gossip" />
                </div>

                <article className="gossip-content">
                    
                    <div className="gossip-heading">

                        <h3 className="gossip-header">
                            {gossip.gossipName}
                        </h3>

                        <p className="gossip-date">
                            21/10/22
                        </p>
                    </div>

                    <div className="gossip-para">
                        {gossip.gossipBody}
                    </div>
                </article>

                <AddCommenSection id={gossip._id} comments={comments} setComments={setComments}/>

           </div>

           <div className="comments">

               <h3 className="comments-heading">
                   comments
               </h3>

               <div className="comments-container">
               {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}
                
                {
                    comments.length > 0  &&

                    comments.map(comment => {

                        return <Comment key={comment._id} owner={comment.owner} commentBody={comment.commentBody}/>
                    })
                }

               </div>
           </div>

        </article>
    )
}

const RightSide = () => {

    return(

        <section className="right-side">
            <p>This  is the right</p>
        </section>
    )
}

const Comment = ({owner, commentBody}) => {

    return (

        <article className="comment">

            <div className="commentor-info">

                <div className="circle">

                </div>

                <p className='commentor-name'>
                    {owner}
                </p>
            </div>

            <p className="comment-para">
                {commentBody}
            </p>
        </article>
    )
}

const AddCommenSection = ({id, comments, setComments}) => {
    
    const [owner, setOwner] = useState("");
    const [commentBody, setCommentBody]  = useState("");
    const [statusMessageOpts, setStatusMessageOpts] = useState({
        show: false, 
        message: "Posting comment", 
        color: ""
    });


    const submitComment = (e) => {

        console.log("Here")
        e.preventDefault();
        setStatusMessageOpts({...statusMessageOpts, show: true});


        if(commentBody === ""){
            console.log("Return clause")
            setStatusMessageOpts({
                show: true,
                message: "Enter a comment please",
                color: "error"
            });
            return;
        }

        const commentDetails = {
            owner,
            commentedPost: id,
            commentBody
        }
        
        
        fetch(`${backendUrl}/api/comments/post-comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentDetails)
        })
        .then(res => res.json())
        .then(result => {
            
            handleResponse(
                result.message,
                result.comment ? (comments.length > 0 ? [...comments, result.comment] : [result.comment] )
                : null,
                statusMessageOpts,
                setStatusMessageOpts,
                setComments
            )
        })
        .catch(() => {
            handleResponse(
                "err",
                null,
                statusMessageOpts,
                setStatusMessageOpts,
                null
            )
        })

    }
    return (

        <div className="add-comments-section">

            <br/> <br/>
            {statusMessageOpts.show && <ResponseMessage message={statusMessageOpts.message} color={statusMessageOpts.color}/>}

            <h3 className='add-comments-section__header'>
                Leave A Comment
            </h3>

            <form className='comments-form'>
                
                <div className="commentor-input-container">
                    <input value={owner} onChange={e => setOwner(e.target.value)} type="text" placeholder='Enter name or leave empty for anonymity'/>
                </div>
                
                <div className="comment-input-container">
                    <textarea value={commentBody} onChange={e => setCommentBody(e.target.value)} placeholder='Enter your comment'></textarea>
                </div>

                <button type='submit' onClick={e => submitComment(e)}>Submit</button>
            </form>
        </div>
    )
}

export default FullGossip