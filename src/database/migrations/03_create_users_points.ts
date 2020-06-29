import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('user_points', table => {
    table.increments('id').primary()
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
    table.integer('total_points').notNullable()
    table.integer('rescue_points').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('user_points')
}