import { Request, Response, Router } from 'express'
import ProductServices from './ProductServices'

import Utils from './../../_lib/utils'

interface Product {
  id: number
  bar_id: number
  product_name: string
  product_url_img: string
}

const ProductApi = (routes: Router) => {
  const productServices = ProductServices()
  const utils = Utils()

  function createProduct(req: Request, resp: Response) {
    productServices.create(req, resp).then((result) => {
      return result ? resp.json(result) : resp.json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function getAllProducts(req: Request, resp: Response) {

    productServices.getAll().then((result: Array<Product>) => {
      if (result) {
        const serializedProducts = result.map((product) => {
          const url_image = utils.mountUrlImage(product.product_url_img)
          return { ...product, url_image }
        })
        return resp.json(serializedProducts)
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function getProductByBar(req: Request, resp: Response) {
    const { barId } = req.params

    if (!barId) {
      return resp.status(400).json('getProductByBar - BAR ID não informado')
    }

    productServices.getByBarId(barId).then((result: Array<Product>) => {
      if (result) {
        const serializedProducts = result.map((product) => {
          const url_image = utils.mountUrlImage(product.product_url_img)
          return { ...product, url_image }
        })
        return resp.json(serializedProducts)
      }
      return resp.status(204).json({})
    }).catch((error) => {
      return resp.json({})
    })
  }

  function deleteProduct(req: Request, resp: Response) {
    const { id } = req.params

    if (!id) {
      return resp.status(400).json('deleteProduct - ID não informado')
    }

    productServices.deleteById(id).then((result) => {
      if (result) {
        return resp.json(result)
      }
      return resp.json(false)
    }).catch((error) => {
      return resp.json({})
    })
  }

  routes.post('/product', createProduct)
  routes.get('/product', getAllProducts)
  routes.get('/product/:barId', getProductByBar)
  routes.delete('/product/:id', deleteProduct)
}

export default ProductApi
