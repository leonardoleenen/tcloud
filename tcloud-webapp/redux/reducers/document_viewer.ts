
export const LOAD_DOCUMENT = 'LOAD_DOCUMENT'

export const documentViewerReducer = (state = { document: null }, action) => {
  switch (action.type) {
    case LOAD_DOCUMENT:
      return {...state,document: action.document}
    default:
      return { ...state }
  }
}