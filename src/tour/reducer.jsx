import { combineReducers } from 'redux'

import { GET_INIT_TOURS, GET_ONE_TOUR } from './action'

function InitialToursReducer(
  state = {
    tours: [],
    isInitial: true
  },
  action
) {
  const { tours } = action
  switch (action.type) {
    case GET_INIT_TOURS:
      return Object.assign({}, state, {
        tours,
        isInitial: true
      })
    default:
      return state
  }
}
function CurrentToursReducer(
  state = {
    tour: {},
    isFetching: true
  },
  action
) {
  const { tour } = action
  switch (action.type) {
    case GET_ONE_TOUR:
      return Object.assign(
        {},
        {
          tour,
          isFetching: false
        }
      )
    default:
      return state
  }
}
export default combineReducers({
  InitialToursReducer,
  CurrentToursReducer
})
