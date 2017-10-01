import { describe, before, it } from "mocha"

import { Collection, Model } from "../src/index"
// import { Collection, Model } from "../lib/bundle.min"

const expect = require("chai").expect

describe("Given a Documentation commitment", () => {
  let instance, results, collectionProps

  describe("and a new instance is created", () => {
    collectionProps = [ { name: "Aaron" }, { name: "Jarrod" } ]

    before(() => instance = new Collection(collectionProps, Model))

    describe("and the first item is called", () => {
      before(() => results = instance.getFirstItem())

      it("should have an id", () => {
        console.log(results)
        expect(results.id).to.be.a('string').to.have.length.above(5)
      })
      it("should have a name", () => {
        expect(results.name).to.be.a('string').to.equal(collectionProps[0].name)
      })
    })

    describe("and the last item is called", () => {
      before(() => results = instance.getLastItem())

      it("should have an id", () => {
        expect(results.id).to.be.a('string').to.have.length.above(5)
      })
      it("should have a name", () => {
        expect(results.name).to.be.a('string').to.equal(collectionProps[1].name)
      })
    })
  })

  // instance.set([ { name: "Jorge" }, { name: "Fabio" } ])
  //
  // /*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" } ]
  // instance.add([ { name: "Rey" } ])
  //
  // /*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" }, { id: "j16ReyPug" name: "Rey" } ]
  // const result = instance.get("j16ReyPug")
  //
  // /*result*/ { id: "j16ReyPug" name: "Rey" }
  // const newModel = { name: "Lola" }
  // instance.replace(oldModelid, newModel)
  //
  // /*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" }, { id: "j16ReyPug" name: "Lola" } ]
  // /*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" }, { id: "j16ReyPug" name: "Lola" } ]
  //
  // const filterFunction = item => (item.name === "Lola")
  // instance.remove(filterFunction)
  //
  // /*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" } ]
  // instance.removeById("j852lghn")
  //
  // /*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" } ]
  // instance.reset()
  //
  // /*instance.toJSON()*/ []
  //
  // //// MODEL
  // const person = { name: "Aaron" }
  // const schema = { id: false, name: "", age: 18 }
  // const instance = new Model(person, schema)
  //
  // /*instance.toJSON()*/ { id: "j852lghk", name: "Aaron", age: 18 }
  //
  // const age = instance.get("age")
  //
  // /*age*/ 18
  // instance.set("age", 31)
  //
  // /*instance.toJSON()*/ { id: "j852lghk", name: "Aaron", age: 31 }
  //
  // const newModel = { id: 1, name: "Jorge", age: 29 }
  //
  // instance.setAtrributes(newModel)
  //
  // /*instance.toJSON()*/ { id: 1, name: "Jorge", age: 29 }
  // const newSchema = { id: false, name: "", toggle: false }
  //
  // instance.setSchema(newSchema)
  //
  // /*instance.toJSON()*/ { id: 1, name: "Jorge", toggle: false }
  // /*instance.getAttributes()*/ { id: 1, name: "Jorge", toggle: false }
  // /*instance.getSchema()*/ { id: false, name: "", toggle: false }
  // /*instance.defaults()*/ { id: false, }
  // instance.toggle("toggle")
  // /*instance.get("1")*/ { id: 1, name: "Jorge", toggle: true }
  //
  // instance.toggle("toggle")
  // /*instance.get("1")*/ { id: 1, name: "Jorge", toggle: false }
  // /*instance.toJSON()*/ { id: 1, name: "Jorge", toggle: false }
  // instance.reset()
  //
  // /*instance.toJSON()*/ {}
})
