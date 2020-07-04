import { Request, Response } from 'express'
import knex from '../../database/connections'

const DiscoveryServices = () => {
  const create = (req: Request, resp: Response) => {
    const {
      bar_id,
      user_id,
    } = req.body

    const date = new Date()
    const formatedDate = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDay()
    }
    console.log('========', formatedDate)

    const discovery = {
      bar_id: Number(bar_id),
      user_id: Number(user_id),
      date: `${formatedDate.year}-${formatedDate.month}-${formatedDate.day}`
    }

    return knex('users_discovery').insert(discovery).then((insert) => {
      if (insert && insert.length) {
        return { id: insert[0], ...discovery }
      }
      return resp.json(insert)
    }).catch((error) => {
      console.error('DiscoveryServices | Create - ', error)
      return resp.json({})
    })
  }

  const getAll = () => {
    return knex('users_discovery').select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('DiscoveryServices | Get All - ', error)
        return []
      })
  }

  const getByUserId = (userId: number) => {
    return knex('users_discovery').where('user_id', userId).select('*').orderBy('id', 'desc')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('DiscoveryServices | Get By ID - ', error)
        return []
      })
  }

  const deleteById = (id: string) => {
    return knex('users_discovery').where('id', id).del()
      .then((result) => {
        if (result) {
          return result
        }
        return false
      }).catch((error) => {
        console.error('DiscoveryServices | Delete By ID - ', error)
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

export default DiscoveryServices