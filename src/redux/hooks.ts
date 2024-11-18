import { useDispatch, TypedUseSelectorHook } from "react-redux";
import { IRootState, AppDispatch } from "./store";
import { useSelector } from "react-redux";


export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector