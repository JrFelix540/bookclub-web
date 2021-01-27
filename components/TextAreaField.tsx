import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea,
    TextareaProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { Fragment, InputHTMLAttributes } from "react";

type InputTextFieldProps = InputHTMLAttributes<HTMLInputElement> &
    TextareaProps & {
        name: string;
        label: string;
        size?: string;
    };

const TextAreaField: React.FC<InputTextFieldProps> = (props) => {
    const [field, { error }] = useField(props);

    return (
        <Fragment>
            <FormControl isInvalid={!!error}>
                <FormLabel htmlFor={props.name}>
                    {props.label}
                </FormLabel>
                <Textarea
                    {...field}
                    id={field.name}
                    placeholder={props.placeholder}
                    {...props}
                />
                {error && (
                    <FormErrorMessage>{error}</FormErrorMessage>
                )}
            </FormControl>
        </Fragment>
    );
};

export default TextAreaField;
