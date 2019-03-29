import { combineReducers } from 'redux'

import { GET_INIT_TOURS, GET_ONE_TOUR,REMOVE_TOUR } from './action'

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
     case REMOVE_TOUR:
        console.log('REMOVE_TOUR');
        console.log('state');
        console.log(state);
        const tourList = state.tours.filter(tour => tour.id !== action.id ); 
          var resultTourDelete = Object.assign({}, state, {             
            tours  : tourList,
            OpenTourDeleteDialog : false
        });             
      return resultTourDelete;
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
