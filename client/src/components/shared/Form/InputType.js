import React from 'react'

export const InputType = ({labelText,labelFor,inputType,value,onChange,name}) => { // to apply dynamic label and form and avoid props
  return (
    <>
     <div className="mb-1">
            <label htmlFor={labelFor} className="form-label">{labelText}</label>
            <input type={inputType} className="form-control" name={name} value={value} onChange={onChange}/>
            </div>
    </>
  )
}
