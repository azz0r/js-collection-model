import { describe, before, it } from "mocha"

import { Model } from "../src/index"
// import { Model } from "../lib/bundle.min"

import { exampleModel, modelSchema } from "./constants"

const expect = require("chai").expect

describe("Given a Chaining model", () => {
  let instance = new Model({}, modelSchema)

  describe("and props are passed WITH a schema", () => {
    before(() => (instance = new Model(exampleModel, modelSchema)))

    it("should have attributes set by the props", () => {
      expect(instance.get("name")).to.equal(exampleModel.name)
    })

    describe("and chained set request are sent", () => {
      before(() => {
        instance = new Model(exampleModel, modelSchema)
        instance.set("name", "Jorge").set("age", 28).toggle("toggle")
      })

      it("should set name to Jorge", () => {
        expect(instance.get("name")).to.equal("Jorge")
      })

      it("should set age to 28", () => {
        expect(instance.get("age")).to.equal(28)
      })

      it("should set toggle to TRUE", () => {
        expect(instance.get("toggle")).to.equal(true)
      })
    })
  })
})
