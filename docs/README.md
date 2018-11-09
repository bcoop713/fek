# Data Types
Fek is all about defining data structures and providing tools to manipulate them.


## Built In Types
### Maybe

A `Maybe` type is used to define a value that _might_ exist. This should be used to define any value that might contain `null` or `undefined`. A `Maybe` type contains two subtypes, `Just` and `Nothing`. `Just` represents data that exists, while `Nothing` represents no value, or `null` for example.

#### Creating Maybes
```js
const data = Just(1) // creates a `Just` type containing the value 1
const noData = Nothing() // creates a `Nothing` type containing no data

const sometimesHasData = toMaybe(null) // creates a `Nothing` type containing no data
const sometimesHasName = toMaybe('Bob') // creates a `Just` type containing the value 'Bob'
```

#### Using Maybes
```js
const twoMore = match({
  Just: (val) => val + 2, // If Maybe contains Just, it's value plus 2 is returned
  Nothing: () => 2 // If Maybe contains a Nothing, 2 is returned
})(sometimesHasData)

const safeData = fromMaybe(0)(sometimesHasData) // If Maybe contains Nothing, a 0 is returned as the default value
```

#### Why?
Developers are lazy and forgetfull. Using data structures such as the `Maybe` type requires developers to account for all options whenever they want to access the data inside of it. 

For example, say you needed to write a function that pulled a name out of some data, but you forgot that there is an edge case where the data object doesn't contain a user object. In vanilla js, you might write:
```js
const getName = (data) => {
  return data.user.name
}
```

Obviously, this would sometimes through an error and cause annoying bugs, but using the `Maybe` type:
```js
const getName = (data) => {
  return match({
    Just: (user) => user.name,
    Nothing: () => 'Jane Doe'
  })(data.user)
}
```

### Result

A `Result` type is similar to `Maybe` but it represents data that results from actions that might fail or return errors. The `Result` type is composed of two subtypes: `Ok` and `Error` which can both contain data.

#### Creating Results
```js
const data = Ok({colors: ['red', 'blue']});
const error = Error('Server not found')
```

#### Using Results
```js
const newState = match({
  Ok: (colors) => {...state, colors},
  Error: (err) => {...state, errorMessage: err}
})(data)
```

## Custom Types
Fek also provides you the tools to create and use your own types:

```js
const contentState = union({
  NoContent: () => {},
  Loading: () => {},
  SomeContent: (content) => content
})

const bodyText = match({
  NoContent: () => 'No Content Found',
  Loading: () => 'Loading, please wait...',
  SomeContent: (content) => content
})(data)
```

# Schemas
## Intro
Schemas are Fek's way of describing the shape of complex data as well as providing assurances. This way, the developer can push all the filthy impure dirty bits of code to the boundries, and be confident in all the code in-between. 

```js
const schema = Obj({
  name: isString,
  race: isString,
  level: isNumber,
  friends: List(isString)
})

const goodData = {
  name: 'Carlos',
  race: 'Dwarf',
  level: 1,
  friends: ['Thanos']
}

const badData = {
  race: 'Turnip',
  level: 'bork',
  friends: ['Carrot']
}


const goodResult = validate(schema)(goodData) // -> Ok(goodData)
const badData = validate(schema)(badData) 
// -> Error([
//      {expected: 'string', received: undefined, path: ['name']},
//      {expected: 'number, received: 'bork', path: ['level']}
//    ])
```

## Type Coercion
In the section on `Maybe` I wrote that it's common to forget about edge cases and their impact on data structures. Schemas alleviate this issue by providing in-code documentation that can quickly be referred to. But how do Schemas help with the flexible and uncertain data structures that are common to modern web development? Not only do schemas validate data, but they can also transform your data to use Fek types.

```js
const userSchema = Obj({
  name: isString,
  age: isNumber
})
const dataSchema = Obj({
  user: Maybe(userSchema), // if user exists, it will be replaced with Just(user), otherwise Nothing()
  timestamp: isString,
  dataCode: isNumber
})

const data = {
  timestamp: '1793829384',
  dataCode: 7
}

const getName = (user) => {
  return match({
    Just: (user) => user.name,
    Nothing: () => 'Jane Doe'
  })(user)
}

const result = validate(dataSchema)(data)

const newState = match({
  Ok: (data) => {...state, name: getName(data.user)},
  Error: (err) => {...state, errorMessage: err}
})(result) 

// newState -> {...state, name: 'Jane Doe'}
```

# Utilities
This will also contain lodash type stuff, but instead of returning `undefined` and errors when shit goes down, it will return Maybes and Results and other safe things. 
Also, there will be tons of utility functions that will help working with monadic data structures such as map, chain/flatmap, concat, etc and other fantasy-land stuff.
