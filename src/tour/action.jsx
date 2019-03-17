import SERVER_URI from '../config'
import exampleTours from '../utils/example-tours'
export const GET_INIT_TOURS = 'GET_INITL_TOURS'
export const GET_ONE_TOUR = 'GET_ONE_TOUR'

const getInitialTours = tours => ({
  type: GET_INIT_TOURS,
  tours
})
const getOneTourById = tour => ({
  type: GET_ONE_TOUR,
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
