"use client";
import { createContext } from "react";

const Context = createContext(0);
// https://stackoverflow.com/questions/67816399/type-children-element-is-missing-properties-with-nextjs-react-context-with-typ
type Props = {
    children?: React.ReactNode;
};

export const ContextProvider: React.FC<Props> = ({ children }: Props) => {
    return <Context.Provider value={0}>{children}</Context.Provider>;
};

export default Context;