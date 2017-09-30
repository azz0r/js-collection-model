import { describe, before, it } from "mocha"

import { Collection } from "../src/index"
// import { Collection } from "../lib/bundle.min"
import Model from "./game.model"

import { exampleModelWithId, exampleModels, modelSchema } from "./constants"

const expect = require("chai").expect

describe("Given a Chaining model", () => {
  let instance = new Collection({}, Model),
    results

  describe("and we want the last item in the array", () => {
    before(() => {
      instance = new Collection(exampleModels, Model)
      results = instance.getFirstItem()
    })

    it("should return the last model", () => {
      expect(results.id).to.equal(exampleModels[0].id)
    })
  })

  describe("and we want the last item in the array", () => {
    before(() => {
      instance = new Collection(exampleModels, Model)
      results = instance.getLastItem()
    })

    it("should return the last model", () => {
      expect(results.id).to.equal(exampleModels[exampleModels.length - 1].id)
    })
  })

  describe("and props are passed WITH a schema", () => {
    before(() => (instance = new Collection([exampleModelWithId, modelSchema,], Model)))

    it("should get the first item", () => {
      expect(instance.getFirstItem().id).to.equal(exampleModelWithId.id)
    })

    it("should get the last item", () => {
      expect(instance.getLastItem().id).to.equal(modelSchema.id)
    })
  })
})
