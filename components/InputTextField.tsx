import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { Fragment, InputHTMLAttributes } from "react";

interface IResponsiveWidth {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    base?: string;
}

type InputTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    width?: IResponsiveWidth;
    size?: string;
};

const InputTextField: React.FC<InputTextFieldProps> = (props) => {
    const [field, { error }] = useField(props);

    return (
        <Fragment>
            <FormControl isInvalid={!!error}>
                <FormLabel htmlFor="name">{props.label}</FormLabel>
                <Input
                    {...field}
                    id={field.name}
                    placeholder={props.placeholder}
                    {...props}
                    w={props.width}
                />
                {error && (
                    <FormErrorMessage>{error}</FormErrorMessage>
                )}
            </FormControl>
        </Fragment>
    );
};

export default InputTextField;
