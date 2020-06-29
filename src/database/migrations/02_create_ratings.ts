import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('ratings', table => {
    table.increments('id').primary()
    table.integer('bar_id')
      .notNullable()
      .references('id')
      .inTable('bars')
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
    table.integer('rating').notNullable()
    table.string('comment', 400).notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('ratings')
}