import { Request, Response, Router, response } from 'express'
import BarServices from './BarServices'

import Utils from './../../_lib/utils'

interface Bar {
  id: number
  name: string
  latitude: number
  longitude: number
  street: string
  address_number: number
  neighborhood: string
  uf: string
  city: string
  website: string
  url_image: string
  phone: number
}

const BarApi = (routes: Router) => {
  const barServices = BarServices()
  const utils = Utils()

  function createBar(req: Request, resp: Response) {
    barServices.create(req, resp).then((result) => {
      return result ? resp.json(result) : resp.json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function getAllBarsInfo(req: Request, resp: Response) {
    const { city } = req.query

    if (city) {
      barServices.getByCity(String(city)).then((result: Array<Bar>) => {
        if (result && result.length) {
          const serializedBars = result.map((bar) => {
            const url_image = utils.mountUrlImage(bar.url_image)
            return { ...bar, url_image }
          })
          return resp.json(serializedBars)
        }
        return resp.status(204).json({})
      }).catch((error) => {
        return resp.json({})
      })
    } else {
      barServices.getAll().then((result: Array<Bar>) => {
        if (result) {
          const serializedBars = result.map((bar) => {
            const url_image = utils.mountUrlImage(bar.url_image)
            return { ...bar, url_image }
          })
          return resp.json(serializedBars)
        }
        return resp.status(204).json({})
      }).catch((error) => {
        return resp.json({})
      })
    }
  }

  function getBarInfo(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('getBarInfo - ID não informado')
    }

    barServices.getById(id).then((result) => {
      if (result) {
        const img_url = result.url_image ? utils.mountUrlImage(result.url_image) : result.url_image
        return resp.json({ ...result, 'url_image': img_url })
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function deleteBar(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('deleteBar - ID não informado')
    }

    barServices.deleteById(id).then((result) => {
      if (result) {
        return resp.json(result)
      }
      return resp.json(false)
    }).catch((error) => {
      return resp.json({})
    })
  }

  routes.post('/bars', createBar)
  routes.get('/bars', getAllBarsInfo)
  routes.get('/bars/:id', getBarInfo)
  routes.delete('/bars/:id', deleteBar)
}

export default BarApi
