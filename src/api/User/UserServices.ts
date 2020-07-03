// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../../database/connections'

const UserServices = () => {
  const create = (req: Request, resp: Response) => {
    const {
      name,
      email,
      password,
      whatsapp,
      uf,
      city,
      image
    } = req.body

    const user = {
      name,
      email,
      password,
      whatsapp,
      uf,
      city,
      image
    }

    return knex('users').insert(user).then((insert) => {
      if (insert && insert.length) {
        return { id: insert[0], ...user }
      }
      return resp.json(insert)
    }).catch((error) => {
      console.error('UserServices | Create - ', error)
      return resp.json({})
    })
  }

  const getAll = () => {
    return knex('users').select('*')
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('UserServices | Get All - ', error)
        return []
      })
  }

  const getByEmail = (email: string) => {
    return knex('users').where('email', String(email)).first()
      .then((result) => {
        if (result) {
          return result
        }
        return []
      }).catch((error) => {
        console.error('UserServices | Get By City - ', error)
        return []
      })
  }

  const getById = (id: number) => {
    return knex('users').where('id', id).first()
      .then((result) => {
        if (result) {
          return result
        }
        return {}
      }).catch((error) => {
        console.error('UserServices | Get By ID - ', error)
        return {}
      })
  }

  const deleteById = (id: string) => {
    return knex('users').where('id', id).del()
      .then((result) => {
        if (result) {
          return result
        }
        return false
      }).catch((error) => {
        console.error('UserServices | Delete By ID - ', error)
        return false
      })

  }

  return {
    create,
    getAll,
    getByEmail,
    getById,
    deleteById
  }
}

export default UserServices
