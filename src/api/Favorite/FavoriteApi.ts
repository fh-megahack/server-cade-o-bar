import { Request, Response, Router } from 'express'
import FavoriteServices from './FavoriteServices'

import Utils from './../../_lib/utils'
import BarServices from '../Bar/BarServices'

interface Favorite {
  id: number
  user_id: number
  bar_id: number
}

const FavoriteApi = (routes: Router) => {
  const favoriteServices = FavoriteServices()
  const barSerivces = BarServices()
  const utils = Utils()

  function createFavorite(req: Request, resp: Response) {
    favoriteServices.create(req, resp).then((result) => {
      return result ? resp.json(result) : resp.json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function getAllFavorite(req: Request, resp: Response) {

    favoriteServices.getAll().then((result: Array<Favorite>) => {
      if (result) {
        return resp.json(result)
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  async function getFavoriteByUserId(req: Request, resp: Response) {
    const { userId } = req.params

    if (!userId) {
      return resp.status(400).json('Get Favorite - USER ID não informado')
    }

    const favorites: Array<Favorite> = await favoriteServices.getByUserId(Number(userId))

    const serializedFavorites = await Promise.all(favorites.map(async (el) => {
      const { bar_id } = el

      const barInfo = await barSerivces.getById(String(bar_id))

      if (barInfo && !barInfo.hasOwnProperty('name')) {
        return resp.json([])
      }

      const { name, url_image } = barInfo
      const bar_image = utils.mountUrlImage(url_image)
      return {
        ...el,
        bar_name: String(name),
        bar_image
      }
    }))

    if (!serializedFavorites) {
      return resp.json([])
    }

    return resp.json(serializedFavorites)

  }

  function deteleFavorite(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('delete Favorite - ID não informado')
    }
    favoriteServices.deleteById(id).then((result) => {
      if (result) {
        return resp.json(result)
      }
      return resp.json(false)
    }).catch((error) => {
      return resp.json({})
    })
  }

  routes.post('/favorite', createFavorite)
  routes.get('/favorite', getAllFavorite)
  routes.get('/favorite/:userId', getFavoriteByUserId)
  routes.delete('/favorite/:id', deteleFavorite)
}

export default FavoriteApi
