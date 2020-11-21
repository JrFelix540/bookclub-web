import { FieldError } from "~/generated/graphql";

export const checkAuthFromResponse = (
    errorsArray: FieldError[],
): boolean => {
    const found = errorsArray.find(
        (err) => err.message === `User not authenticated`,
    );
    return found ? true : false;
};
