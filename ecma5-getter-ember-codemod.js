module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function transformThisExpression() {
    return root
      .find(j.CallExpression, { callee: {
        object: {
          type: 'ThisExpression'
        },
        property: {
          name: 'get'
        }
      }})
      .forEach(path => {
        path.replace(
          j.memberExpression(
            j.thisExpression(),
            j.identifier(path.node.arguments[0].value)
          )
        )
      });
  }

  function transformGetOnObject(typicalEmberAssignment='model') {
    return root
      .find(j.CallExpression, {
        callee: {
          object: {
            name: typicalEmberAssignment
          },
          property: {
            name: 'get'
          }
        }
      })
      .forEach(path => {
        path.replace(
          j.memberExpression(
            path.node.callee.object,
            j.identifier(path.node.arguments[0].value)
          )
        )
      });
  }

  function transformGetPropertiesOnObject() {
    return root
      .find(j.CallExpression, {
        callee: {
          property: {
            name: 'getProperties'
          }
        }
      })
      .forEach(path => {
        path.replace(
          path.node.callee.object
        )
      });
  }


  transformThisExpression();

  ['model', 'route', 'controller'].forEach(function(typicalEmberAssignment) {
    transformGetOnObject(typicalEmberAssignment);
  })

  transformGetPropertiesOnObject();

  return root.toSource();
}
