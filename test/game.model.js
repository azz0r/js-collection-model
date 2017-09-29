import BaseModel from "../src/model"

export default class extends BaseModel {
  constructor(props) {
    super(props, {
      id: false,
      animations: true,
    })
  }
}
