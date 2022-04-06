import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { compare, hash } from 'bcrypt';
import { saltRounds } from './auth.constants';
import { User } from '.prisma/client';
import { IJwt } from './dtos/jwt';
import { JwtService } from '@nestjs/jwt';
import { ILoginLocalDto } from './dtos/login-local.dto';
import { v4 as uuidv4 } from 'uuid';
import { randomString } from '../../utils/randomString';

@Injectable()
export class AuthService {
    constructor(private _prisma: PrismaService, private _jwtService: JwtService) {}
    googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }

        return {
            message: 'User information from google',
            user: req.user,
        };
    }

    async hashPassword(plainPassword: string) {
        return hash(plainPassword, saltRounds);
    }

    async comparePasswords(plainPassword: string, hashedPassword: string) {
        return compare(plainPassword, hashedPassword);
    }

    async validate(email: string, password: string) {
        const user = await this._prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                credentials: true,
            },
        });

        if (!user) throw new Error('User not found');
        if (user.authenticationType !== 'LOCAL') throw new Error('Not a local user');
        if (!user.credentials.value) throw new Error('No password set');

        return (await this.comparePasswords(password, user.credentials.value)) ? user : undefined;
    }

    async register(email: string, password: string, firstName?: string, lastName?: string) {
        return this._prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                authenticationType: 'LOCAL',
                roles: {
                    create: {
                        value: 'USER',
                    },
                },
                credentials: {
                    create: {
                        value: await this.hashPassword(password),
                    },
                },
            },
        });
    }

    registerGoogleUser(email: string, externalId: string, firstName?: string, lastName?: string) {
        return this._prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                authenticationType: 'GOOGLE',
                externalId,
                roles: {
                    create: {
                        value: 'USER',
                    },
                },
            },
        });
    }

    getUserByEmail(email: string) {
        return this._prisma.user.findFirst({
            where: {
                email,
            },
        });
    }

    registerAzureAdUser(email: string, externalId: string, firstName?: string, lastName?: string) {
        return this._prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                authenticationType: 'AZUREAD',
                externalId,
                roles: {
                    create: {
                        value: 'USER',
                    },
                },
            },
        });
    }

    async login(user: User): Promise<ILoginLocalDto> {
        if (!user) throw new UnauthorizedException();
        const accessToken = await this.createAccessToken(user.id);
        const refreshToken = await this.createRefreshToken(user.id);

        return {
            accessToken,
            refreshToken: refreshToken.token,
        };
    }

    async cleanTokens() {
        this._prisma.userRefreshToken.deleteMany({
            where: {
                validUntil: {
                    lte: new Date(),
                },
            },
        });
    }

    async getRefreshToken(token: string, userId: number) {
        return this._prisma.userRefreshToken.findFirst({
            where: {
                validUntil: {
                    gte: new Date(),
                },
                revoked: false,
                userId: userId,
            },
        });
    }

    async createAccessToken(userId: number) {
        const roles = await this._prisma.userRole.findMany({
            where: {
                users: {
                    every: {
                        id: userId,
                    },
                },
            },
            select: {
                value: true,
            },
        });

        const data = {
            roles: roles.map(x => x.value),
            userId: userId,
        } as IJwt;

        return this._jwtService.sign(data, { expiresIn: '5m' });
    }

    async createRefreshToken(userId: number) {
        const refreshToken = randomString(8) + '-' + uuidv4();
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + 7);
        return this._prisma.userRefreshToken.create({
            data: {
                token: refreshToken,
                validUntil: expDate,
                userId: userId,
            },
        });
    }

    async deleteRefreshToken(id: number) {
        this._prisma.userRefreshToken.delete({
            where: {
                id: id,
            },
        });
    }

    async refreshTokens(token: string, user: User) {
        const rToken = await this.getRefreshToken(token, user.id);
        if (!rToken) return;

        await this.deleteRefreshToken(rToken.id);
        return await this.login(user);
    }
}
