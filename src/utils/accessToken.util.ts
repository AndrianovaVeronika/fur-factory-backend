import * as jwt from "jsonwebtoken";

const configString = "vgychjfccffcg";

export const getNewToken = (userId) => jwt.sign({userId}, configString, {
    expiresIn: 86400 // 24 hours
});

export const decodeToken = (token) => jwt.verify(token, configString, async (err: Error, decoded: { userId: number }) => {
    return decoded?.userId;
});