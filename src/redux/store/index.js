import { createStore } from '@reduxjs/toolkit';
import { Provider } from '';
import reducer from '../reducer';
import actions from '../actions';

const initialStore = {}
const store = createStore(reducer, initialStore);


export default function StoreContainer() {

}
