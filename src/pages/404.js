import { useEffect } from "react";
import { navigate } from "gatsby"

/* 
 * TODO: navigate to the right page
 * if authenticated '/chat'
 * if not authenticated '/'
 */

const NotFoundPage = () => {
  useEffect(() => navigate('/', { replace: true }), [])
  return null
}

export default NotFoundPage
