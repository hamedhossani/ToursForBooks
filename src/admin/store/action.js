import { ADD_TOUR,GET_TOURS_LIST,GET_ONE_TOUR,EDIT_TOUR,REMOVE_TOUR } from './types';
import { database,databaseRef,toursTestRef} from './firebase';
// Store thyn
import { fetchCurrentMessage } from '../../page/action';

const _fetchToursList = (tours) => ({
    type: GET_TOURS_LIST,
  	tours
})
const _fetchOneTourById = (tour) => ({
    type: GET_ONE_TOUR,
  	tour
})
const _deleteTourById = (id) => ({
    type: REMOVE_TOUR,
  	id
})
const _addTour = (tour) => ({
    type: ADD_TOUR,
  	tour
})
const _editTour = (tour) => ({
    type: EDIT_TOUR,
  	tour
})

export function fetchToursList() {
    console.log('fetchToursList');
    return  (dispatch) =>{
        return databaseRef.child('tours_test').orderByKey().once('value', snap => {
            const tours = [];
            snap.forEach(child => {
                var item = child.val();
                var key = child.key;
                item.id = key;           
                tours.push(item);        
            });
           dispatch(_fetchToursList(tours));
       });
    }
}
export function fetchOneTourById(id) {
    return function (dispatch) {
        return toursTestRef.child(id).on('value', function (snapshot) {
            const tour = snapshot.val();
            dispatch(_fetchOneTourById(tour))
          });
    };
}

export function deleteTourById(id) {
    console.log('deleteTourById');
    console.log(id);
    return  (dispatch) => {
        return databaseRef.child(`tours_test/${id}`).remove().then(() => {
            dispatch(_deleteTourById(id));
            // dispatch(fetchCurrentMessage('tour is deleted'))
        });
    }
}

 
export const addTour = (tour) => {
    return (dispatch) => {
        // const book = {
        //     title: bookData.title,
        //     description: bookData.description,
        //     author: bookData.author,
        //     published: bookData.published
        // }; 
        return databaseRef.child(`tours_test`).push(tour).then(ref => {
            dispatch(_addTour({
                id: ref.key,
                ...tour
            }));
        });
    };
};
 
export const editTour = (tour) => {
    return (dispatch) => {  
        return toursTestRef.child(tour.id).set(tour).then(ref => {
            dispatch(_editTour(tour));
        });
    };
};