import { createContext, useContext } from "react";
import { CssGlobalContextDataType } from "./CssGlobalContextDataType";
import { CssGlobalContextDefaultState } from "./CssGlobalContextDefaultState";

// for provider
export const CssGlobalContext = createContext<CssGlobalContextDataType>(CssGlobalContextDefaultState);

// for consumer 
export const useCssGlobalContext = () => {
    return useContext(CssGlobalContext);
}