import React, { useReducer } from "react";
import ImageReducer from "./ImageReducer";
import ImageContext from "./ImageContext";
import { SETPREVIEWSOURCE } from "../types";

function imageState({ children }) {
  const initialState = {
    pathImage: "test",
  };

  const [state, dispath] = useReducer(ImageReducer, initialState);

  const setPreviewSource = (file) => {
    console.log(file);
    dispath({
      type: SETPREVIEWSOURCE,
      payload: file,
    });
  };
  return (
    <ImageContext.Provider
      value={{ pathImage: state.pathImage, setPreviewSource }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export default imageState;
