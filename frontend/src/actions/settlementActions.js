import { 
    GET_SETTLEMENTS, 
    ADD_SETTLEMENT, 
    SET_LOADING, 
    SETTLEMENTS_ERROR
 } from "./types";


// Get SETTLEMENTS from server
export const getSettlements = () => async dispatch => {
    try {
      setLoading();
  
      const res = await fetch('/settlements');
      const data = await res.json();
  
      dispatch({
        type: GET_SETTLEMENTS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: SETTLEMENTS_ERROR,
        payload: err.response.statusText
      });
    }
  };
// Add new settlement
export const addSettlement = settlement => async dispatch => {
  try {
    setLoading();

    const res = await fetch('/settlements', {
      method: 'POST',
      body: JSON.stringify(settlement),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_SETTLEMENT,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: SETTLEMENTS_ERROR,
      payload: err.response.statusText
    });
  }
};

 // Set loading to true
export const setLoading = () => {
    return {
      type: SET_LOADING
    };
  };