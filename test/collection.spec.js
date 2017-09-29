import { describe, before, it } from "mocha"

import Model from "./game.model"
import { Collection } from "../src/index"
// import { Collection } from "../lib/bundle.min"

import { exampleModelWithId, exampleModels, extraModels } from "./constants"

const expect = require("chai").expect

describe("Given a Collection function", () => {
  let instance = new Collection({}, Model),
    results

  describe("and props are passed WITH two items", () => {
    before(() => {
      instance = new Collection(exampleModels, Model)
      results = instance.toJSON()
    })

    it("should have attributes set by the props", () => {
      expect(results).to.have.length(exampleModels.length)
    })

    it("should have a default prop", () => {
      expect(results[0].name).to.equal(exampleModels[0].name)
      expect(results[1].name).to.equal(exampleModels[1].name)
    })
  })

  describe("and props are passed WITHOUT any items", () => {
    before(() => {
      instance = new Collection([], Model)
      results = instance.toJSON()
    })

    it("should have collection length of zero", () => {
      expect(results).to.have.length(0)
    })

    it("should be an array", () => {
      expect(results).to.be.an("array")
    })
  })

  describe("and a replace request is made", () => {
    let models, extraModels

    before(() => {
      models = [{ id: 10, name: "First", }, { id: 11, namec: "First", },]
      extraModels = [{ id: 12, name: "Second", }, { id: 13, name: "Third", },]

      instance = new Collection(models, Model)
      instance.replace(models[0].id, extraModels[0])
      results = instance.toJSON()
    })

    it("should have a new name for the id", () => {
      expect(results[0].id).to.equal(models[0].id)
      expect(results[0].name).to.equal(extraModels[0].name)
    })
  })

  describe("and a set request is sent", () => {
    before(() => {
      instance.set(extraModels)
      results = instance.toJSON()
    })

    it("should have two models", () => {
      expect(results).to.have.length(2)
    })
  })
  describe("and a reverse request is sent", () => {
    before(() => {
      instance.set(extraModels)
      results = instance.toJSON()

      instance.reverse()
      results = {
        original: results,
        replacement: instance.toJSON(),
      }
    })

    it("should have the last item as the first", () => {
      const { original, replacement, } = results
      const originalLength = original.length - 1

      expect(original[originalLength].id).to.equal(replacement[0].id)
    })
  })

  describe("and an add request is sent", () => {
    before(() => {
      instance.add(extraModels[0])
      results = instance.toJSON()
    })

    it("should have three items", () => {
      expect(results).to.have.length(3)
    })

    it("should have the newest model set to last", () => {
      expect(results[2].name).to.equal(extraModels[0].name)
    })
  })

  describe("and an remove request is sent", () => {
    before(() => {
      const firstModel = extraModels[0]
      const filterFunction = item => item.name !== firstModel.name

      instance.remove(filterFunction)
      results = instance.toJSON()
    })

    it("should only have 1 item in the collection", () => {
      expect(results).to.have.length(1)
    })
  })

  describe("and an reset request is sent", () => {
    before(() => {
      instance = new Collection(exampleModels, Model)
      instance.reset()
      results = instance.toJSON()
    })

    it("should be an EMPTY collection", () => {
      expect(results).to.be.empty
    })
  })

  describe("and an removeById request is sent", () => {
    before(() => {
      instance = new Collection(exampleModels, Model)
      instance.removeById(instance.toJSON()[0].id)
      results = instance.toJSON()
    })

    it("should have one item in the collection", () => {
      expect(results).to.have.length(exampleModels.length - 1)
    })
  })

  describe("and a get request is sent", () => {
    before(() => {
      instance = new Collection(exampleModels, Model)
      instance.add(exampleModelWithId)
      results = instance.get(exampleModelWithId.id)
    })

    it("should have one item in the collection", () => {
      expect(results.name).to.equal(exampleModelWithId.name)
    })
  })
})
