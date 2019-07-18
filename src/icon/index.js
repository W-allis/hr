const requireAll = require.context('./svg', false, /\.svg$/)
requireAll.keys().map(requireAll)