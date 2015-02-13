
module.exports = function DataStructure(schema) {

  function Constructor(object) {
    Constructor.validate(object)
    return object
  }

  Constructor.validate = function(object) {
    validate(schema, object)
  }

  return Constructor

}

function validate(schema, value) {
  if (schema === Number) schema = 'number'
  if (schema === String) schema = 'string'
  if (typeof schema === 'string') {
    if (typeof value !== schema) throw new Error('should be a ' + schema)
  } else if (typeof schema === 'function') {
    if (typeof schema.validate === 'function') {
      schema.validate(value)
    } else if (!(value instanceof schema)) {
      throw new Error('should be an instance of ' + schema)
    }
  } else if (typeof schema === 'object') {
    if (!value) throw new Error('should be an object')
    validateObject(schema, value)
  } else {
    throw new Error('invalid schema')
  }
}

function validateObject(schema, object) {
  for (var prop in schema) {
    if (!(prop in object)) {
      throw new Error('missing property: "' + prop + '"')
    }
    try {
      validate(schema[prop], object[prop])
    } catch (e) {
      throw new Error('error in property "' + prop + '": ' + e.message)
    }
  }
}

