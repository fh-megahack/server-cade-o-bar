import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('users_discovery', table => {
    table.increments('id').primary()
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
    table.integer('bar_id')
      .notNullable()
      .references('id')
      .inTable('bars')
    table.date('date').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users_discovery')
}