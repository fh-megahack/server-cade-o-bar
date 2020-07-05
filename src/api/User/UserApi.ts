import { Request, Response, Router } from 'express'
import UserServices from './UserServices'
import PointServices from './../Point/PointServices'
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
  const pointServices = PointServices()
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

  async function doLogin(req: Request, resp: Response) {
    const { email, password } = req.body
    let response
    if (!email || !password) {
      return resp.status(400).json({})
    }

    const userInfo = await userServices.getByEmail(String(email))
    if (!userInfo) {
      return resp.status(400).json({})
    }
    if (userInfo.password === password) {
      const url_image = userInfo.image ? utils.mountUrlImage(userInfo.image) : userInfo.image

      response = { ...userInfo, url_image }

      const points = await pointServices.getByUserId(userInfo.id)
      if (points && points.length) {
        response.points = points[0]
      }

      return resp.json(response)

    } else {
      return resp.status(400).json(false)
    }


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
