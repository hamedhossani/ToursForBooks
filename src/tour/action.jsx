import SERVER_URI from '../config/config'
import exampleTours from '../utils/example-tours'

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
