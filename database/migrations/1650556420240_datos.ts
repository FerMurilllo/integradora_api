import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Datos extends BaseSchema {
  protected tableName = 'datos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('valor').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
