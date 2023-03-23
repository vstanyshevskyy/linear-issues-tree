import { LinearClient } from '@linear/sdk'

// Api key authentication
const linearClient = new LinearClient({
  apiKey: process.env.REACT_APP_LINEAR_API_KEY
})

export default linearClient