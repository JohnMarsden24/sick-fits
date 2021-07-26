import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"

import classes from "./Comments.module.css"
import NewCommentForm from "./NewCommentForm"

import useHttp from "../../hooks/use-http"
import { getAllComments } from "../../lib/api"
import LoadingSpinner from "../UI/LoadingSpinner"
import CommentsList from "../comments/CommentsList"

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false)
  const params = useParams()
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments)

  const { id } = params

  useEffect(() => {
    sendRequest(id)
  }, [sendRequest, id])

  const startAddCommentHandler = () => {
    setIsAddingComment(true)
  }

  const onAddedCommentHandler = useCallback(() => {
    sendRequest(id)
  }, [sendRequest, id])

  let comments

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === "completed" && (loadedComments || loadedComments.length)) {
    comments = <CommentsList comments={loadedComments} />
  }

  if (status === "completed" && (!loadedComments || !loadedComments.length)) {
    comments = <p className="centered">No comments yet</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={id} onAddedComment={onAddedCommentHandler} />
      )}
      {comments}
    </section>
  )
}

export default Comments
