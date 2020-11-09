export const findInArray = (
    numberArray: number[],
    searchNumber: number,
) => {
    const found = numberArray.find((num) => num === searchNumber);
    return found ? true : false;
};
