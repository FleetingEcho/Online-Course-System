import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createLogger } from 'redux-logger';
// using persist to solve the refreshing problem(info lost)
const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};
const myPersistReducer = persistReducer(persistConfig, reducer)

const middleWares = [];
middleWares.push(thunk);
const composeEnhancers = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
});
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
middleWares.push(composeEnhancers);
const store = createStore(
    myPersistReducer,
    applyMiddleware(...middleWares)
    );
// const store = persistStore(store);
export const persistor = persistStore(store)
// export default store
export default store;