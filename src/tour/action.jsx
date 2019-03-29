import SERVER_URI from '../config'
import exampleTours from '../utils/example-tours'
import { databaseRef, toursTestRef } from '../admin/store/firebase'

export const GET_INIT_TOURS = 'GET_INITL_TOURS'
export const GET_ONE_TOUR = 'GET_ONE_TOUR'
export const REMOVE_TOUR = 'REMOVE_TOUR'
export const ADD_TOUR = 'ADD_TOUR'
export const EDIT_TOUR = 'EDIT_TOUR'

const getInitialTours = tours => ({
  type: GET_INIT_TOURS,
  tours
})
const getOneTourById = tour => ({
  type: GET_ONE_TOUR,
  tour
})
const _deleteTourById = id => ({
  type: REMOVE_TOUR,
  id
})
const _addTour = tour => ({
  type: ADD_TOUR,
  tour
})
const _editTour = tour => ({
  type: EDIT_TOUR,
  tour
})
// to-do: rebuilt fetching tour data

export function fetchInitialTours() {
  return function(dispatch) {
    return process.env.NODE_ENV === 'development'
      ? dispatch(getInitialTours(exampleTours))
      : fetch(`${SERVER_URI}/getTours`).then(res => {
          res.json().then(data => {
            dispatch(getInitialTours(data))
          })
        })
  }
}
export function fetchOneTourById(id) {
  return function(dispatch) {
    return process.env.NODE_ENV === 'development'
      ? dispatch(getOneTourById(exampleTours.filter(tour => tour.id === id)))
      : fetch(`${SERVER_URI}/getTour/${id}`).then(res => {
          res.json().then(data => {
            dispatch(getOneTourById(data))
          })
        })
  }
}
export function deleteTourById(id) {
  return dispatch => {
    return databaseRef
      .child(`tours_test/${id}`)
      .remove()
      .then(() => {
        dispatch(_deleteTourById(id))
        // dispatch(fetchCurrentMessage('tour is deleted'))
      })
  }
}
export const addTour = tour => {
  return dispatch => {
    return databaseRef
      .child(`tours_test`)
      .push(tour)
      .then(ref => {
        dispatch(
          _addTour({
            id: ref.key,
            ...tour
          })
        )
      })
  }
}
export const editTour = tour => {
  return dispatch => {
    return toursTestRef
      .child(tour.id)
      .set(tour)
      .then(ref => {
        dispatch(_editTour(tour))
      })
  }
}
