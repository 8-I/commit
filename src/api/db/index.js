
import config from 'config'

export const DATABASE = config.env === 'development' ? 'develop' : 'master'

export const r = require('rethinkdbdash')({
  host: '62.210.236.128',
  port: 28015,
}).db(DATABASE)

const find = table => id =>
  r.table(table).get(id).run()

const findAll = table => () =>
  r.table(table).run()

const findBy = table => (key, email) =>
  r.table(table).filter(r.row(key).eq(email)).run()
    .then(user => user[0] || null)

const destroy = table => id =>
  r.table(table).get(id).delete().run()

const save = table => object =>
  r.table(table).insert(object).run()

const update = table => (id, object) =>
  r.table(table).get(id).update(object).run()

const append = table => (id, field, element) =>
  r.table(table).get(id).update({
    [field]: r.row(field).append(element),
  })

const updateField = table => (id, field, newValue) =>
  r.table(table).get(id).update({
    [field]: newValue,
  })

export const db = table => ({
  find: find(table),
  findAll: findAll(table),
  findBy: findBy(table),
  destroy: destroy(table),
  update: update(table),
  save: save(table),
  append: append(table),
  updateField: updateField(table),
})

export const Spaces = db('spaces')
export const User = db('users')
export const Order = db('orders')
