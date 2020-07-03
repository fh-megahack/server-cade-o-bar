import { Request, Response, Router } from 'express'
import RatingServices from './RatingServices'

import Utils from './../../_lib/utils'
import UserServices from '../User/UserServices'

interface Rating {
  id: number
  bar_id: number
  user_id: number
  rating: number
  comment: string
}

const RatingApi = (routes: Router) => {
  const ratingServices = RatingServices()
  const userServices = UserServices()
  const utils = Utils()

  function createRating(req: Request, resp: Response) {
    ratingServices.create(req, resp).then((result) => {
      return result ? resp.json(result) : resp.json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function getAllRatings(req: Request, resp: Response) {

    ratingServices.getAll().then((result: Array<Rating>) => {
      if (result) {
        return resp.json(result)
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  async function getRatingByBar(req: Request, resp: Response) {
    const { barId } = req.params


    if (!barId) {
      return resp.status(400).json('getRatingByBar - BAR ID não informado')
    }

    const barRatings: Array<Rating> = await ratingServices.getByBarId(barId)
    if (!barRatings) {
      return resp.status(204).json({})
    }

    const serializedRatings = await Promise.all(barRatings.map(async (el) => {
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

    if (serializedRatings && !serializedRatings) {
      return resp.status(204).json({})
    }

    return resp.json(serializedRatings)
  }

  function deleteRating(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('deleteRating - ID não informado')
    }

    ratingServices.deleteById(id).then((result) => {
      if (result) {
        return resp.json(result)
      }
      return resp.json(false)
    }).catch((error) => {
      return resp.json({})
    })
  }

  routes.post('/rating', createRating)
  routes.get('/rating', getAllRatings)
  routes.get('/rating/:barId', getRatingByBar)
  routes.delete('/rating/:id', deleteRating)

  return {
    getRatingByBar
  }
}

export default RatingApi
