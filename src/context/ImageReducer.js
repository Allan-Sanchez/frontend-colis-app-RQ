import { SETPREVIEWSOURCE } from "../types";
const ImageReducer = (state, action) => {
  switch (action.type) {
    case SETPREVIEWSOURCE:
      return { ...state, pathImage: action.payload };

    default:
      return state;
  }
};

export default ImageReducer;
