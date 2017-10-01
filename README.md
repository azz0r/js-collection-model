# JS Collection & Model

**API**
+ [`collection`](#collection)
+ [`model`](#model)

**Examples**
+ [`collection`](#examples__collection)
+ [`model`](#examples__model)
+ [`with redux`](#examples__redux)


### <a id="collection"></a>Collection

new Collection\(models, model\)

```js
const instance = new Collection([ { name: "Aaron" }, { name: "Jarrod" } ], Model)

/*instance.toJSON()*/ { id: "j852lghk", name: "Aaron" }, { id: "j852lghl", name: "Jarrod" } ]
```

set\(models\)

```js
instance.set([ { name: "Jorge" }, { name: "Fabio" } ])

/*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" } ]
```

add\(item\)

```js
instance.add([ { name: "Rey" } ])

/*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" }, { id: "j16ReyPug" name: "Rey" } ]
```

get\(\)

```js
const result = instance.get("j16ReyPug")

/*result*/ { id: "j16ReyPug" name: "Rey" }
```

replace\(id, item\)

```js
const newModel = { name: "Lola" }
instance.replace(oldModelid, newModel)

/*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" }, { id: "j16ReyPug" name: "Lola" } ]
```

toJSON\(\)

```js
/*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" }, { id: "j16ReyPug" name: "Lola" } ]
```

remove\(function\)

```js
const filterFunction = item => (item.name === "Lola")
instance.remove(filterFunction)

/*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" }, { id: "j852lghn" name: "Fabio" } ]
```

removeById\(id\)

```js
instance.removeById("j852lghn")

/*instance.toJSON()*/ [ { id: "j852lghm", name: "Jorge" } ]
```

reset\(\)

```js
instance.reset()

/*instance.toJSON()*/ []
```

### <a name="model"></a>Model

new Model\(attributes, schema\)

```js
const person = { name: "Aaron" }
const schema = { id: false, name: "", age: 18 }
const instance = new Model(person, schema)

/*instance.toJSON()*/ { id: "j852lghk", name: "Aaron", age: 18 }
```

get\(field\)

```js
const age = instance.get("age")

/*age*/ 18
```

set\(field, vale\)

```js
instance.set("age", 31)

/*instance.toJSON()*/ { id: "j852lghk", name: "Aaron", age: 31 }
```

setAttributes\(attributes\)

```js
const newModel = { id: 1, name: "Jorge", age: 29 }

instance.setAtrributes(newModel)

/*instance.toJSON()*/ { id: 1, name: "Jorge", age: 29 }
```

setSchema\(schema\)

```js
const newSchema = { id: false, name: "", toggle: false }

instance.setSchema(newSchema)

/*instance.toJSON()*/ { id: 1, name: "Jorge", toggle: false }
```

getAttributes\(\)

```js
/*instance.getAttributes()*/ { id: 1, name: "Jorge", toggle: false }
```

getSchema\(\)

```js
/*instance.getSchema()*/ { id: false, name: "", toggle: false }
```

defaults\(\)

```js
/*instance.defaults()*/ { id: false, }
```

toggle\(\)
```js
instance.toggle("toggle")
/*instance.get("1")*/ { id: 1, name: "Jorge", toggle: true }

instance.toggle("toggle")
/*instance.get("1")*/ { id: 1, name: "Jorge", toggle: false }
```

toJSON\(\)

```js
/*instance.toJSON()*/ { id: 1, name: "Jorge", toggle: false }
```

reset\(\)

```js
instance.reset()

/*instance.toJSON()*/ {}
```

## <a name="id"></a>Examples

#### <a name="examples__collection"></a>Collection
```js
import Person from "./person.model"

const models = [ { name: "Aaron" }, { name: "Jarrod" } ]

instance = new Collection(models, Person)

/* instance.getFirstItem() */ { id: "j852lghn", name: "Aaron" }
/* instance.getLastItem() */ { id: "j852lghk", name: "Jarrod" }
```

#### <a name="examples__model"></a>Model
```js
const props = { name: "Aaron", animations: false }
const schema = { name: "", animations: true, brain: true }

instance = new Model(props, schema)

/*instance.toJSON()*/ { name: "Aaron", animations: false, brain: true }
```

#### <a name="examples__redux"></a>Redux
##### roster.reducer.js

```js
import { Collection } from "js-collection-model"
import Model from "./wrestler.model"
import { roster } from "./defaults.json"

const defaultState = []
const defaultAction = {}

export default (state = defaultState, action = defaultAction) => {
  state = JSON.parse(JSON.stringify(state))
  const collection = new Collection(state, Model)

  switch (action.type) {
    case "RESET":
      collection.reset()
    break
    case "GENERATE":
      collection.set(roster)
    break
    case "UPDATE_ROSTER":
      collection.set(action.payload.roster)
    break
    case "REMOVE_WRESTLER":
      collection.removeById(action.payload.id)
    break
    case "CREATE_WRESTLER":
      collection.add(action.payload.wrestler)
    break
    case "UPDATE_WRESTLER":
      collection.replace(action.payload.id, action.payload.wrestler)
    break
  }
  return collection.get().length === 0 ? defaultState : collection.toJSON()
}
```

#### wrestler.model

```js
import { Model } from "js-collection-model"

export default class extends Model {
  constructor(props) {
    super(props, {
      name: "vacant",
      points: 50
    })
  }
}
```
