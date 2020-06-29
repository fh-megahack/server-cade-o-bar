import express from 'express'

const routes = express.Router()

routes.get('/', (req, resp) => {
  return resp.json({ message: 'Listen port 3333' })
})

export default routes