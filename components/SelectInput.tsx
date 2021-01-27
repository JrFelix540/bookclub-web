import {
    FormControl,
    FormErrorMessage,
    Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { Fragment, SelectHTMLAttributes } from "react";

interface ICommunity {
    id: number;
    name: string;
}

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    label: string;
    optionValues: ICommunity[];
    size?: string;
};

const SelectInput: React.FC<SelectInputProps> = (props) => {
    const [field, { error }] = useField(props);

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
                        <option value={val.id} key={val.name}>
                            {val.name}
                        </option>
                    ))}
                </Select>
                {error && (
                    <FormErrorMessage>{error}</FormErrorMessage>
                )}
            </FormControl>
        </Fragment>
    );
};

export default SelectInput;
