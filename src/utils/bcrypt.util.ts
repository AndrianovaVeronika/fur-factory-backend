const bcryptUtil = require("bcryptjs");

export const getHashedPassword = (password: string): string => {
    return bcryptUtil.hashSync(password, 8);
};

export const isPasswordValid = (passwordToCompare: string, compareWithHashed: string): boolean => {
    return bcryptUtil.compareSync(passwordToCompare, compareWithHashed);
}