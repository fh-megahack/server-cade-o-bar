// eslint-disable-next-line no-unused-vars
import { Request, Response, response } from 'express'
import knex from '../../database/connections'
import { StringTagSupport } from 'knex'

const BarServices = () => {
  const create = (req: Request, resp: Response) => {
    const {
      name,
      latitude,
      longitude,
      street,
      address_number,
      neighborhood,
      uf,
      city,
      website,
      url_image,
      phone
    } = req.body

    const bar = {
      name,
      street,
      address_number,
      neighborhood,
      latitude,
      longitude,
      uf,
      city,
      website,
      url_image,
      phone
    }

    return knex('bars').insert(bar).then((insert) => {
      if (insert && insert.length) {
        return { id: insert[0], ...bar }
      }
      return resp.json(insert)
    }).catch((error) => {
      console.error('BarServices | Create - ', error)
      return resp.json({})
    })
  }

  const getAll = () => {
    return knex('bars').select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('BarServices | Get All - ', error)
        return []
      })
  }

  const getByCity = (city: string) => {
    return knex('bars').where('city', String(city)).select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('BarServices | Get By City - ', error)
        return []
      })
  }

  const getById = (id: string) => {
    return knex('bars').where('id', id).first()
      .then((result) => {
        if (result) {
          return result
        }
        return {}
      }).catch((error) => {
        console.error('BarServices | Get By ID - ', error)
        return { error }
      })
  }

  const deleteById = (id: string) => {
    return knex('bars').where('id', id).del()
      .then((result) => {
        if (result) {
          return result
        }
        return false
      }).catch((error) => {
        console.error('BarServices | Delete By ID - ', error)
        return false
      })

  }

  return {
    create,
    getAll,
    getByCity,
    getById,
    deleteById
  }
}

export default BarServices
