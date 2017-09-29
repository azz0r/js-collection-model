import sanitizer from "sanitizer"
import uniqid from "uniqid"

export const defaultAttributes = {}
export const defaultSchema = {}

export default class Model {
  constructor(attributes = defaultAttributes, schema = defaultSchema) {
    this.setSchema(schema)
    this.setAttributes(attributes)

    if (!attributes.id) {
      this.set("id", uniqid())
    }
  }

  get(field) {
    let result

    if (this.attributes[field]) {
      result = this.attributes[field]
    } else {
      result = this.schema[field]
    }

    return result
  }

  set(field, value) {
    this.attributes[field] = value

    return this
  }

  setAttributes(attributes) {
    this.attributes = attributes

    return this
  }

  setSchema(schema) {
    this.schema = schema

    return this
  }

  reset() {
    this.attributes = {}

    return this
  }

  getAttributes() {
    const attributes = Object.assign({}, this.schema, this.attributes)
    const keys = Object.keys(attributes)

    keys.forEach(key => {
      attributes[key] = this.sanitize(attributes[key])
    })

    return attributes
  }

  getSchema() {
    return this.schema
  }

  defaults() {
    return { id: false, }
  }

  toggle(field) {
    const value = this.attributes[field]

    this.set(field, !value)

    return this
  }

  sanitize(str) {
    return typeof str === "string" ? sanitizer.escape(str) : str
  }

  toJSON() {
    return this.getAttributes()
  }
}
