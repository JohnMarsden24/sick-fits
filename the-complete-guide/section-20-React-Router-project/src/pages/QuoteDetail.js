import { useEffect } from "react"
import { useParams, Route, Link, useRouteMatch } from "react-router-dom"
import Comments from "../components/comments/Comments"
import QuoteItem from "../components/quotes/QuoteItem"
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import useHttp from "../hooks/use-http"
import { getSingleQuote } from "../lib/api"
import LoadingSpinner from "../components/UI/LoadingSpinner"

const QuoteDetail = () => {
  const match = useRouteMatch()
  const { id } = useParams()

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(id)
  }, [sendRequest, id])

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className="centered">{error}</p>
  }

  if (!loadedQuote.text) {
    return <p>No quote found</p>
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  )
}

export default QuoteDetail