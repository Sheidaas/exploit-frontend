import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools }                           from 'redux-devtools-extension';
import { createLogger }                                  from 'redux-logger';
import thunkMiddleware                                   from 'redux-thunk';
import { languageReducer }                               from './reducers/language'
import receivePacketsReducer                             from './reducers/receiving_packets'
import socket_client                                     from './reducers/sending_packets'
import { userReducer }                                   from './reducers/user'

const sendPacketsReducer = socket_client.messagesReducer
const loggerMiddleware = createLogger();

export default createStore(
    combineReducers({
        userReducer,
        sendPacketsReducer,
        receivePacketsReducer,
        languageReducer
    }),
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            //loggerMiddleware
        )
    )
)