import { createAppSlice } from "@/lib/redux/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CandidateType } from "@/lib/types/User/UserType";

export interface UiSliceState {
  candidates_metadata: {
    selected_candidates: string[];
    selecting: boolean
  }
}

const initialState: UiSliceState = {
  candidates_metadata: {
    selected_candidates: [],
    selecting: false
  }
};

export const uiSlice = createAppSlice({
  name: "ui",
  initialState,
  reducers: (create) => ({
    addSelectedCandidate: create.reducer((state, action: PayloadAction<string[]>) => {
      // Primero, verifica si el elemento ya existe en selected_candidates
      const existingIndex = state.candidates_metadata.selected_candidates.findIndex(candidate => candidate === action.payload[0]);

      if (existingIndex !== -1) {
        // Si el elemento ya existe, lo eliminamos
        state.candidates_metadata.selected_candidates.splice(existingIndex, 1);
      } else {
        // Si el elemento no existe, lo agregamos
        state.candidates_metadata.selected_candidates.push(...action.payload);
      }

      // Comprueba si el último elemento agregado es el mismo que el que se está procesando
      if (state.candidates_metadata.selected_candidates[state.candidates_metadata.selected_candidates.length - 1] === action.payload[0]) {
        // Cambia el estado selecting a false
        // state.selecting = false;
      }
    }),
    setSelectingCandidate: create.reducer((state, action: PayloadAction<boolean>) => {
      state.candidates_metadata.selecting = action.payload
    })
  }),

  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectedCandidates: (ui) => ui.candidates_metadata.selected_candidates,
    isSelectingCandidates: (ui) => ui.candidates_metadata.selecting
  },
});

// Action creators are generated for each case reducer function.
export const { addSelectedCandidate, setSelectingCandidate } = uiSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectedCandidates, isSelectingCandidates } = uiSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//     (dispatch, getState) => {
//       const currentValue = selectCount(getState());

//       if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//         dispatch(incrementByAmount(amount));
//       }
//     };
