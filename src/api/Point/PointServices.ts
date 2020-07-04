import { Request, Response } from 'express'
import knex from '../../database/connections'

const PointsServices = () => {

  const create = async (req: Request, resp: Response) => {

    const {
      user_id,
      total_points
    } = req.body

    const point = {
      user_id: Number(user_id),
      total_points: Number(total_points),
      rescue_points: Number(total_points)
    }

    const allPoints = await getAll()

    const exist = allPoints.find((el) => el.user_id === point.user_id)

    if (exist) {
      return resp.status(412).json({})
    }

    return knex('user_points').insert(point).then((insert) => {
      if (insert && insert.length) {
        return { id: insert[0], ...point }
      }
      return resp.json(insert)
    }).catch((error) => {
      console.error('Points Services | Create - ', error)
      return resp.json({})
    })
  }

  const update = (req: Request, resp: Response) => {

    const {
      user_id,
      total_points,
      rescue_points
    } = req.body

    const point = {
      user_id: Number(user_id),
      total_points: Number(total_points),
      rescue_points: Number(rescue_points)
    }

    return knex('user_points').where({ user_id: user_id })
      .update({ total_points, rescue_points }).then((insert) => {
        if (insert) {
          return resp.json(point)
        }
        return resp.json(insert)
      }).catch((error) => {
        console.error('Points Services | Create - ', error)
        return resp.json({})
      })
  }

  const getAll = () => {
    return knex('user_points').orderBy('total_points', 'desc')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('Points Services | Get All - ', error)
        return []
      })
  }

  const getByUserId = (userId: string) => {
    return knex('user_points').where('user_id', Number(userId)).select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('Points Services | Get By ID - ', error)
        return []
      })
  }

  const deleteById = (id: string) => {
    return knex('user_points').where('id', id).del()
      .then((result) => {
        if (result) {
          return result
        }
        return false
      }).catch((error) => {
        console.error('Points Services | Delete By ID - ', error)
        return false
      })

  }

  return {
    create,
    update,
    getAll,
    getByUserId,
    deleteById
  }
}

export default PointsServices
