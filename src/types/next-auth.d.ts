import NextAuth from 'next-auth/next';

declare module 'next-auth' {
    interface Session {
        user: {
            data: {
                id: number;
                email: string;
                username: string;
                acronym: string;
                master: boolean;
                access_token: string;
            }
        }
    }
}