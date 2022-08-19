import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {filterData} from './filter-data/filter-data';
import {appData} from './app-data/app-data';
import {userProcess} from './user-process/user-process';

const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
  [NameSpace.Filter]: filterData.reducer,
  [NameSpace.User]: userProcess.reducer,
});

export {rootReducer};
