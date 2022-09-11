export interface DecodedVO {
    id: string,
    username: string,
    roles: Array<string> | Array<String> | undefined,
    iat?: Number | number,
    exp?: Number | number,
    aud?: string,
    iss?: string
};