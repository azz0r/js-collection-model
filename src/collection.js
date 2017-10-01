const defaultModels = []
const defaultModel = {}

export default class Collection {
  constructor(models = defaultModels, model = defaultModel) {
    this.models = models
    this.model = model
    this.modelSchema = new model().getSchema()
  }

  set(models) {
    this.models = models

    return this
  }

  add(item) {
    this.models.push(item)

    return this
  }

  replace(id, item) {
    this.models = this.models.map(model => {
      if (model.id === id) {
        return Object.assign({}, item, { id: model.id, })
      } else {
        return model
      }
    })

    return this
  }

  remove(filterBy) {
    this.models = this.models.filter(item => filterBy(item))

    return this
  }

  removeById(id) {
    const filterBy = item => item.id !== id

    this.remove(filterBy)

    return this
  }

  reset() {
    this.models = defaultModels

    return this
  }

  reverse() {
    this.models = this.models.reverse()

    return this
  }

  getLastItem() {
    const model = this.getModels()[this.models.length - 1]

		return this.get(model.id)
  }

  getFirstItem() {
    const model = this.getModels()[0]

		return this.get(model.id)
  }

  get(id) {
    const collection = this.getModels()

    return collection.find(item => item.id === id)
  }

  getModels() {
    return this.models.map(item => new this.model(item, this.modelSchema).toJSON())
  }

  toJSON() {
    return this.getModels()
  }
}
