import { FormControl, FormErrorMessage, Select } from '@chakra-ui/core'
import { useField } from 'formik'
import React, { Fragment, SelectHTMLAttributes } from 'react'
import { Community } from '~/generated/graphql'

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement>& {
    name: string
    label: string
    optionValues: Community[]
}


const SelectInput: React.FC<SelectInputProps> = (props) => {
    const [field, {error}] = useField(props)

    return (
        <Fragment>
            <FormControl isInvalid={!!error}>
                <Select 
                placeholder={props.label}
                {...field}
                id={field.name}
                {...props}
                
                >
                    {props.optionValues?.map((val) => (
                        <option value={val.id} key={val.name}>{val.name}</option>
                    ))}
                </Select>
                { error && <FormErrorMessage>{error}</FormErrorMessage>}

            </FormControl>
            
        </Fragment>
    )
}


export default SelectInput