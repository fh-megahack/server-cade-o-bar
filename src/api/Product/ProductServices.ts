// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../../database/connections'

const ProductServices = () => {
  const create = (req: Request, resp: Response) => {
    const {
      bar_id,
      name,
      image
    } = req.body

    const product = {
      bar_id: Number(bar_id),
      product_name: name,
      product_url_img: image
    }

    return knex('bar_hightlights').insert(product).then((insert) => {
      if (insert && insert.length) {
        return { id: insert[0], ...product }
      }
      return resp.json(insert)
    }).catch((error) => {
      console.error('ProductServices | Create - ', error)
      return resp.json({})
    })
  }

  const getAll = () => {
    return knex('bar_hightlights').select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('ProductServices | Get All - ', error)
        return []
      })
  }

  const getByBarId = (barId: string) => {
    return knex('bar_hightlights').where('bar_id', Number(barId)).select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('ProductServices | Get By ID - ', error)
        return []
      })
  }

  const deleteById = (id: string) => {
    return knex('bar_hightlights').where('id', id).del()
      .then((result) => {
        if (result) {
          return result
        }
        return false
      }).catch((error) => {
        console.error('ProductServices | Delete By ID - ', error)
        return false
      })

  }

  return {
    create,
    getAll,
    getByBarId,
    deleteById
  }
}

export default ProductServices
