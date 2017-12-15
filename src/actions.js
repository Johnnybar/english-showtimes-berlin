import React from 'react';
import axios from './axios';

export const defaultAction = function() {
    console.log('in actions');
    // return axios.get('/getFriendsInfoToFriends').then((friends)=>{
    //     return {
    //         type:'GET_FRIENDS',
    //         friends:friends.data.results
    //     };
    // });
};

//ADD ID TO ACTIONS NOW THAT WE ARE GETTING IT FROM FRIENDS

// if (action.type == 'ADD_SINGLE_MESSAGE') {
//     state = Object.assign({}, state, {
//         messagesArr: [ ...messagesArr, action.messageWithUser ]
//     });
// }
