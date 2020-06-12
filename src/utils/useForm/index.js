import { useState } from "react"

export const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue)
  return [
    values,
    (type, formValue) => {
      return setValues({ ...values, [type]: formValue })
    }
  ]
}