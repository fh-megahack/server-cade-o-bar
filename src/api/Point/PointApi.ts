import { Request, Response, Router } from 'express'
import PointServices from './PointServices'

import Utils from './../../_lib/utils'
import UserServices from '../User/UserServices'

interface Point {
  id: number
  user_id: number
  total_points: number
  rescue_points: number
}

const PointApi = (routes: Router) => {
  const pointServices = PointServices()
  const userServices = UserServices()
  const utils = Utils()

  function createPoints(req: Request, resp: Response) {
    pointServices.create(req, resp).then((result) => {
      return result ? resp.json(result) : resp.json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function updatePoints(req: Request, resp: Response) {
    console.log(req.body)
    pointServices.update(req, resp).then((result) => {
      return result ? resp.json(result) : resp.json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  async function getAllPoints(req: Request, resp: Response) {

    const usersPoints: Array<Point> = await pointServices.getAll()

    if (!usersPoints) {
      return resp.status(204).json({})
    }

    const serializedPoints = await Promise.all(usersPoints.map(async (el) => {
      const { user_id } = el

      const userInfo = await userServices.getById(user_id)

      if (userInfo && !userInfo.hasOwnProperty('name')) {
        return {}
      }

      const { name, image } = userInfo
      const user_image = utils.mountUrlImage(image)
      return {
        ...el,
        user_name: name,
        user_image
      }
    }))

    if (serializedPoints && !serializedPoints.length) {
      return resp.status(204).json({})
    }

    return resp.json(serializedPoints)
  }

  async function getPointsByUser(req: Request, resp: Response) {
    const { userId } = req.params

    if (!userId) {
      return resp.status(400).json('getPointsByUser - BAR ID não informado')
    }

    pointServices.getAll().then((result: Array<Point>) => {
      if (result && result.length) {
        const index = result.findIndex((el) => el.user_id === Number(userId))
        if (index >= 0) {

          return resp.json({
            total_points: result[index].total_points,
            rescue_points: result[index].rescue_points,
            position: index + 1
          })
        }
        return resp.status(204).json({})
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function deletePoints(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('deletePoints - ID não informado')
    }

    pointServices.deleteById(id).then((result) => {
      if (result) {
        return resp.json(result)
      }
      return resp.json(false)
    }).catch((error) => {
      return resp.json({})
    })
  }


  routes.post('/points', createPoints)
  routes.put('/points', updatePoints)
  routes.get('/points', getAllPoints)
  routes.get('/points/:userId', getPointsByUser)
  routes.delete('/points', deletePoints)
}

export default PointApi
