import { combineSlices  } from '@reduxjs/toolkit';
import { authSlice } from '@/lib/redux/slices/authSlice'
import { uiSlice } from '@/lib/redux/slices/uiSlice'

export const rootReducer = combineSlices ( authSlice, uiSlice );