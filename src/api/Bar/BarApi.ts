import { Request, Response, Router, response } from 'express'
import BarServices from './BarServices'
import ProductServices from './../Product/ProductServices'
import RatingServices from './../Rating/RatingServices'

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

interface Product {
  id: number
  bar_id: number
  product_name: string
  product_url_img: string
}

interface ProductDescription {
  name: string
  url_image: string
}

interface RatingFull {
  id: number
  bar_id: number
  user_id: number
  rating: number
  comment: string
  user_name: string
  user_image: string
}

interface BarDetail {
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
  phone: number,
  products: {
    name: string
    url_image: string
  }[],
  ratings: {
    id: number
    bar_id: number
    user_id: number
    rating: number
    comment: string
    user_name: string
    user_image: string
  }
}

const BarApi = (routes: Router) => {
  const barServices = BarServices()
  const productServices = ProductServices()
  const ratingServices = RatingServices()
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

  async function getBarInfo(req: Request, resp: Response) {
    const { id } = req.params
    let response

    if (!id) {
      return resp.status(400).json('getBarInfo - ID não informado')
    }

    const barInfo = await barServices.getById(id)

    if (!barInfo) {
      return resp.status(400).json({})
    }
    const url_image = barInfo.url_image ? utils.mountUrlImage(barInfo.url_image) : barInfo.url_image
    response = { ...barInfo, url_image }


    const products = await productServices.getByBarId(id)

    if (products && products.length) {
      const serializedProducts = (products as any[]).map((el) => {
        const url_image = utils.mountUrlImage(el.product_url_img)
        const name = el.product_name
        return { name, url_image }
      });

      response.products = serializedProducts
    }

    const ratings = await ratingServices.getFullInfoByBarId(id)

    if (ratings && ratings.length) {
      response.ratings = ratings
    }

    return resp.json(response)
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
