import React, { FC } from 'react'

type OptionType = {
    title: string,
    value: string
}
type SelectPropsType = {
    options: OptionType[],
    onChangeHandler: (e: string) => void
}

const Select:FC<SelectPropsType> = ({options, onChangeHandler}) => {    
  return (
    <select onChange={(e) => onChangeHandler(e.target.value)}>
        {options?.map(option => (
            <option key={option.value} value={option.value}>{option.title}</option>
        ))}
    </select>
  )
}

export default Select