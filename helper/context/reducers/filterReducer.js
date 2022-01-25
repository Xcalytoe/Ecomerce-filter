import { FILTER_INACTIVE, FILTER_ACTIVE } from "../actionsType/actiontypes";
export const initialFilter = {
  filterActive: false,
  error: null,
};
export const filter = (state = initialFilter, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILTER_ACTIVE:
      return {
        ...state,
        filterActive: true,
      };
    case FILTER_INACTIVE:
      return {
        ...state,
        filterActive: false,
      };
    default:
      return state;
  }
};
