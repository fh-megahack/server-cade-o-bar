import { Request, Response, Router } from 'express'
import DiscoveryServices from './DiscoveryServices'

import Utils from './../../_lib/utils'
import BarServices from '../Bar/BarServices'

interface Discovery {
  id: number
  user_id: number
  bar_id: number
}

const DiscoveryApi = (routes: Router) => {
  const discoveryServices = DiscoveryServices()
  const barSerivces = BarServices()
  const utils = Utils()

  function createDiscovery(req: Request, resp: Response) {
    discoveryServices.create(req, resp).then((result) => {
      return result ? resp.json(result) : resp.json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function getAllDiscovery(req: Request, resp: Response) {

    discoveryServices.getAll().then((result: Array<Discovery>) => {
      if (result) {
        return resp.json(result)
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  async function getDiscoveryByUserId(req: Request, resp: Response) {
    const { userId } = req.params

    if (!userId) {
      return resp.status(400).json('Get Discovery - USER ID não informado')
    }

    const discovery: Array<Discovery> = await discoveryServices.getByUserId(Number(userId))

    const serializedDiscovery = await Promise.all(discovery.map(async (el) => {
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

    if (!serializedDiscovery) {
      return resp.json([])
    }

    return resp.json(serializedDiscovery)

  }

  async function getDiscoveryByBarId(req: Request, resp: Response) {
    const { barId } = req.params

    if (!barId) {
      return resp.status(400).json('Get Discovery - USER ID não informado')
    }

    const discoveries: Array<Discovery> = await discoveryServices.getByBarId(Number(barId))

    return resp.json(discoveries)
  }

  function deteleDiscovery(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('delete Favorite - ID não informado')
    }
    discoveryServices.deleteById(id).then((result) => {
      if (result) {
        return resp.json(result)
      }
      return resp.json(false)
    }).catch((error) => {
      return resp.json({})
    })
  }

  routes.post('/discovery', createDiscovery)
  routes.get('/discovery', getAllDiscovery)
  routes.get('/discovery/:userId', getDiscoveryByUserId)
  routes.get('/discovery/bar/:barId', getDiscoveryByBarId)
  routes.delete('/discovery/:id', deteleDiscovery)
}

export default DiscoveryApi
