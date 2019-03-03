/**
 * http://redux.js.org/docs/recipes/ReducingBoilerplate.html
 * @param type
 * @param argNames
 * @returns {Function}
 */
export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };

  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });

  return action;
};
