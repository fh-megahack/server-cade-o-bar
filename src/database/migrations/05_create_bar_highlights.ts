import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('bar_hightlights', table => {
    table.increments('id').primary()
    table.integer('bar_id')
      .notNullable()
      .references('id')
      .inTable('bars')
    table.string('product_name').notNullable()
    table.string('product_url_img').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('bar_hightlights')
}