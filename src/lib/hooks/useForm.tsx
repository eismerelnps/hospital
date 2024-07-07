
import { useState } from "react"
/**
handle input change receives as parameter a event
desectructured as 'target' and 
set a new value to the state 


returns a array of values
  1st: State value
  2nd: a function for changing the state
*/
export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState);
  // const dispatch = useDispatch()

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (e: any) => {
    const { target } = e;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setValues({
      ...values,
      [target.name]: value,

    });

  };

  return [values, handleInputChange, reset];
};
