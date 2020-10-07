import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core'
import { useField } from 'formik'
import React, { Fragment, InputHTMLAttributes } from 'react'

type InputTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
    width?: string
}


const InputTextField: React.FC<InputTextFieldProps> = (props) => {

    const [field, {error}] = useField(props)

    return (
        <Fragment>
             <FormControl isInvalid={!!error}>
                <FormLabel htmlFor="name">{props.label}</FormLabel>
                <Input {...field} id={field.name} placeholder={props.placeholder} {...props} width={props.width} />
               { error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>
        </Fragment>
    )
}


export default InputTextField