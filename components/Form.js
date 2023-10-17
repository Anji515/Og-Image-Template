'use client'
import { useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VENDOR_NAME':
      return { ...state, vendorName: action.payload };
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_VENDOR_DETAILS':
      return { ...state, vendor_details: action.payload};
    case 'SET_VENDOR_LOGO':
      return { ...state, vendorLogo: action.payload, vendorLogoUrl: URL.createObjectURL(action.payload) };
    case 'RESET':
      return { vendorName: '', content: '', vendor_details:'' ,vendorLogo: null ,vendorLogoUrl: null};
    default:
      return state;
  }
};

export default function Form() {
  const [formState, dispatch] = useReducer(formReducer, {
    vendorName: '',
    content: '',
    vendor_details:'',
    vendorLogo: null,
    vendorLogoUrl: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submit',formState)
      localStorage.setItem('form-data',JSON.stringify(formState))
      dispatch({ type: 'RESET' });
    } catch (error) {
        
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="bg-white p-14 rounded-lg shadow-lg w-[500px]">
        <h1 className="text-2xl font-semibold mb-4">Vendor Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="vendorName" className="block text-sm font-medium text-black">
              Vendor Name
            </label>
            <input
              type="text"
              id="vendorName"
              value={formState.vendorName}
              onChange={(e) => dispatch({ type: 'SET_VENDOR_NAME', payload: e.target.value })}
              className="w-full border border-black rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-black">
            Content
            </label>
            <textarea
              id="content"
              value={formState.content}
              onChange={(e) => dispatch({ type: 'SET_CONTENT', payload: e.target.value })}
              className="w-full border border-black rounded-md p-2 h-32"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="vendorImage" className="block text-sm font-medium text-black">
              Vendor Details
            </label>
            <input
              type="text"
              id="vendor_details"
              value={formState.vendor_details}
              onChange={(e) => dispatch({ type: 'SET_VENDOR_DETAILS', payload: e.target.value })}
              className="w-full border border-black rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="vendorLogo" className="block text-sm font-medium text-black">
              Vendor Logo
            </label>
            <input
              type="file"
              id="vendorLogo"
              onChange={(e) => dispatch({ type: 'SET_VENDOR_LOGO', payload: e.target.files[0] })}
              className="w-full "
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}