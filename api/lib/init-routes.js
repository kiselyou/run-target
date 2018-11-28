/**
 *
 * @param {Object} routes
 * @param {Function} callback
 */
export function eachRout(routes, callback) {
  for (const module in routes) {
    if (!routes.hasOwnProperty(module)) {
      continue
    }
    for (const route of routes[module]) {
      callback(route)
    }
  }
}