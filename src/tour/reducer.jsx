import { combineReducers } from 'redux'

import { GET_INIT_TOURS, GET_ONE_TOUR, REMOVE_TOUR, ADD_TOUR, EDIT_TOUR } from './action'

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
      const tourList = state.tours.filter(tour => tour.id !== action.id);
      var resultTourDelete = Object.assign({}, state, {
        tours: tourList,
        OpenTourDeleteDialog: false
      });
      return resultTourDelete;
    case ADD_TOUR:
      console.log('ADD_TOUR');
      const resAdd = Object.assign({}, state, {
        tour: action.tour,
        ...state.tours
      });
      console.log(resAdd);
      return resAdd;

    case EDIT_TOUR:
      console.log('EDIT_TOUR');
      console.log(state);
      //find the index of object from array that you want to update
      const objIndex = state.tours.findIndex(tour => tour.id === action.tour.id);

      // make new object of updated object.
      const updatedObj = { ...state.tours[objIndex], tour: action.tour };
      console.log('updatedObj');
      console.log(updatedObj);
      // make final new array of objects by combining updated object.
      const updatedProjects = [
        ...state.tours.slice(0, objIndex),
        updatedObj,
        ...state.tours.slice(objIndex + 1),
      ];
      const resEdit = Object.assign({}, state, {
        tours: updatedProjects
      });
      console.log(resEdit);
      return resEdit;

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
