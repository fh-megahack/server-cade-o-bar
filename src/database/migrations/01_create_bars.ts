import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('bars', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('street').notNullable()
    table.integer('address_number').notNullable()
    table.string('neighborhood').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
    table.string('website').notNullable()
    table.string('url_image').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('bars')
}