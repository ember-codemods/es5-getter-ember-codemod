module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function transformThisExpression() {
    const j = api.jscodeshift;
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
      })
      .toSource();
  }

  transformThisExpression()
  return root.toSource();
}
