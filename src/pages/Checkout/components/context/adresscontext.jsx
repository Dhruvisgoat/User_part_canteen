import { createContext, useContext, useReducer } from 'react';

// Define your initial state here
const initialState = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  saveAddress: false,
};
// Create your context
const AddressContext = createContext();

// Create a reducer function to handle state updates
function addressReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_SAVE_ADDRESS':
      return { ...state, saveAddress: !state.saveAddress };
    default:
      return state;
  }
}

// Create a provider component that wraps your application
export function AddressProvider({ children }) {
  const [state, dispatch] = useReducer(addressReducer, initialState);

  return (
    <AddressContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
}

// Create a custom hook to access the context
export function useAddress() {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
}
