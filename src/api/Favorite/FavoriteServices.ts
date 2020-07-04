import { Request, Response } from 'express'
import knex from '../../database/connections'

const FavoriteServices = () => {
  const create = (req: Request, resp: Response) => {
    const {
      bar_id,
      user_id,
    } = req.body

    const favorite = {
      bar_id: Number(bar_id),
      user_id: Number(user_id),
    }

    return knex('users_favorites').insert(favorite).then((insert) => {
      if (insert && insert.length) {
        return { id: insert[0], ...favorite }
      }
      return resp.json(insert)
    }).catch((error) => {
      console.error('RatingServices | Create - ', error)
      return resp.json({})
    })
  }

  const getAll = () => {
    return knex('users_favorites').select('*')
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

  const getByUserId = (userId: number) => {
    return knex('users_favorites').where('user_id', userId).select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('RatingServices | Get By ID - ', error)
        return []
      })
  }

  const deleteById = (id: string) => {
    return knex('users_favorites').where('id', id).del()
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
    getByUserId,
    deleteById
  }
}

export default FavoriteServices