
export const LOAD_DOCUMENT = 'LOAD_DOCUMENT'
export const UPDATE_ENTITY_DETAIL_LIST = 'UPDATE_ENTITY_DETAIL_LIST'


export const documentViewerReducer = (state = { document: null, entity_detail_list:[] }, action) => {
  switch (action.type) {
    case LOAD_DOCUMENT:
      return {...state,document: action.document}
    case UPDATE_ENTITY_DETAIL_LIST:
      return {...state,entity_detail_list: action.list}
    default:
      return { ...state }
  }
}