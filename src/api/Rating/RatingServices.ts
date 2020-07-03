// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../../database/connections'

import UserServices from '../User/UserServices'
import Utils from './../../_lib/utils'


interface Rating {
  id: number
  bar_id: number
  user_id: number
  rating: number
  comment: string
}

const RatingServices = () => {
  const userServices = UserServices()
  const utils = Utils()

  const create = (req: Request, resp: Response) => {

    const {
      bar_id,
      user_id,
      rating,
      comment
    } = req.body

    const evaluation = {
      bar_id: Number(bar_id),
      user_id: Number(user_id),
      rating: Number(rating),
      comment
    }

    return knex('ratings').insert(evaluation).then((insert) => {
      if (insert && insert.length) {
        return { id: insert[0], ...evaluation }
      }
      return resp.json(insert)
    }).catch((error) => {
      console.error('RatingServices | Create - ', error)
      return resp.json({})
    })
  }

  const getAll = () => {
    return knex('ratings').select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('RatingServices | Get All - ', error)
        return []
      })
  }

  const getByBarId = (barId: string) => {
    return knex('ratings').where('bar_id', Number(barId)).select('*')
      .then((result: Array<Rating>) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('RatingServices | Get By ID - ', error)
        return []
      })
  }

  const getFullInfoByBarId = async (barId: string) => {
    if (!barId) {
      return []
    }

    const barRatings = await getByBarId(barId)
    if (barRatings && !barRatings.length) {
      return []
    }

    const serializedRatings = await Promise.all(barRatings.map(async (el) => {
      const { user_id } = el

      const userInfo = await userServices.getById(user_id)

      if (userInfo && !userInfo.hasOwnProperty('name')) {
        return []
      }

      const { name, image } = userInfo
      const user_image = utils.mountUrlImage(image)
      return {
        ...el,
        user_name: String(name),
        user_image
      }
    }))

    if (!serializedRatings) {
      return []
    }

    return serializedRatings
  }

  const deleteById = (id: string) => {
    return knex('ratings').where('id', id).del()
      .then((result) => {
        if (result) {
          return result
        }
        return false
      }).catch((error) => {
        console.error('RatingServices | Delete By ID - ', error)
        return false
      })

  }

  return {
    create,
    getAll,
    getByBarId,
    getFullInfoByBarId,
    deleteById
  }
}

export default RatingServices
