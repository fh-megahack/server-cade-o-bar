import { Request, Response, Router } from 'express'
import UserServices from './UserServices'

import Utils from './../../_lib/utils'

interface User {
  id: number
  name: string
  email: string
  password: string
  whatsapp: string
  uf: string
  city: string
  image: string
}

const UserApi = (routes: Router) => {
  const userServices = UserServices()
  const utils = Utils()

  function createUser(req: Request, resp: Response) {
    userServices.create(req, resp).then((result) => {
      return result ? resp.json(result) : resp.json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function getAllUsersInfo(req: Request, resp: Response) {

    userServices.getAll().then((result: Array<User>) => {
      if (result) {
        const serializedUsers = result.map((user) => {
          const url_image = utils.mountUrlImage(user.image)
          return { ...user, url_image }
        })
        return resp.json(serializedUsers)
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function getUserInfo(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('getBarInfo - ID não informado')
    }

    userServices.getById(Number(id)).then((result) => {
      if (result) {
        const url_image = result.image ? utils.mountUrlImage(result.image) : result.image
        return resp.json({ ...result, url_image })
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function doLogin(req: Request, resp: Response) {
    const { email, password } = req.body

    userServices.getByEmail(String(email)).then((result: User) => {
      if (result) {
        if (result.password === password) {
          return resp.json(result)
        } else {
          return resp.status(400).json(false)
        }
      }
      return resp.status(204).json(false)
    }).catch((error) => {
      return resp.json(false)
    })
  }

  function deleteUser(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('deleteBar - ID não informado')
    }

    userServices.deleteById(id).then((result) => {
      if (result) {
        return resp.json(result)
      }
      return resp.json(false)
    }).catch((error) => {
      return resp.json({})
    })
  }

  routes.post('/users', createUser)
  routes.post('/login', doLogin)
  routes.get('/users', getAllUsersInfo)
  routes.get('/users/:id', getUserInfo)
  routes.delete('/users/:id', deleteUser)
}

export default UserApi
