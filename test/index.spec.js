import { describe, it } from "mocha"

import CollectionInstance from "../src/collection"
import modelInstance from "../src/model"
import { Collection, Model } from "../src/index"
// import { Collection, Model } from "../lib/bundle.min"

const expect = require("chai").expect

describe("given collection and model", () => {
  it("should match an instance of the raw collection", () => {
    expect(CollectionInstance).to.deep.equal(Collection)
  })

  it("should match an instance of the raw model", () => {
    expect(modelInstance).to.deep.equal(Model)
  })
})
