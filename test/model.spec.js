import { describe, before, it } from "mocha"

import { Model } from "../src/index"
// import { Model } from "../lib/bundle.min"

import { exampleModel, modelSchema, exampleModelWithId, newName } from "./constants"

const expect = require("chai").expect

describe("Given a Model function", () => {
  let instance = new Model({}, modelSchema)

  describe("and it is invoked with props and modelSchema", () => {
    before(() => (instance = new Model(exampleModel, modelSchema)))

    it("should have a name attribute", () => {
      expect(instance.get("name")).to.equal(exampleModel.name)
    })

    it("should have a age attribute", () => {
      expect(instance.get("age")).to.be.a("number").to.equal(exampleModel.age)
    })

    it("should have a brain attribute", () => {
      expect(instance.get("brain")).to.equal(modelSchema.brain)
    })
  })

  describe("and props are passed WITHOUT a modelSchema", () => {
    before(() => (instance = new Model(exampleModel)))

    it("should have attributes set by the props", () => {
      expect(instance.get("name")).to.equal(exampleModel.name)
    })

    it("should have a default prop", () => {
      expect(instance.get("brain")).to.equal(undefined)
    })

    it("should have not brain attribute", () => {
      expect(instance.get("brain")).to.not.exist
    })
  })

  describe("and props are passed in WITH an id", () => {
    before(() => (instance = new Model(exampleModelWithId, modelSchema)))
    it("should use that id", () => {
      expect(instance.get("id")).to.equal(exampleModelWithId.id)
    })
  })

  describe("and props are passed in WITHOUT an id", () => {
    before(() => (instance = new Model(exampleModel, modelSchema)))

    it("should create a new id", () => {
      expect(instance.get("id")).to.not.equal(undefined)
    })
  })

  describe("and a set request is sent", () => {
    before(() => instance.set("name", newName))

    it("should update the attribute", () => {
      expect(instance.get("name")).to.equal(newName)
    })
  })

  describe("and a toJSON request is sent", () => {
    let result

    before(() => {
      instance = new Model(exampleModel, modelSchema)
      instance.set("name", newName)
      result = instance.toJSON()
    })

    it("should return one default attribute", () => {
      expect(result.brain).to.equal(modelSchema.brain)
    })

    it("should return one over rode attribute", () => {
      expect(result.name).to.equal(newName)
    })
  })

  describe("and a request for defaults is sent", () => {
    it("should return one default attribute", () => {
      const defaultModel = { id: false, }

      expect(instance.defaults()).to.deep.equal(defaultModel)
    })
  })

  describe("and a toggle field request is sent", () => {
    before(() => {
      instance = new Model(modelSchema, modelSchema)
      instance.toggle("toggle")
    })

    it("should set", () => {
      expect(instance.get("toggle")).to.equal(true)
    })

    describe("and a toggle field request is sent", () => {
      before(() => {
        instance.toggle("toggle")
      })

      it("should set", () => {
        expect(instance.get("toggle")).to.equal(false)
      })
    })
  })

  describe("and a reset request is sent", () => {
    before(() => instance.reset())

    it("should return one over rode attribute", () => {
      expect(instance.attributes).to.be.an("object")
      expect(Object.keys(instance.attributes).length).to.equal(0)
    })
  })
})
