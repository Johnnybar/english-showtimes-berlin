import React from 'react';

export default function(state = {}, action) {



    if (action.type == 'DEFAULT_ACTION') {
        console.log('this is in reducer');
        state = Object.assign({}, state, {
            
        });
    }

    return state;
}
