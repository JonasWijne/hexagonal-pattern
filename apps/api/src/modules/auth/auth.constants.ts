import { randomString } from '../../utils/randomString';

export const jwtSecret = randomString(14);
export const saltRounds = 10;
