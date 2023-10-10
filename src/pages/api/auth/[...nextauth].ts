import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions = {
    secret: '532523523f23f23',
    providers: [
        CredentialsProvider( {
            name: "VIP",
            credentials: {
                email: { 
                    label: "E-mail", 
                    type: "email",
                    placeholder: "email@email.com" 
                },
                password: { 
                    label: "Password", 
                    type: "password"
                }
            },
            async authorize( credentials, req ) {
                const RESPONSE = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/token/login-by-vip/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( {
                        email: credentials?.email,
                        password: credentials?.password
                    } )
                } );

                const USER = await RESPONSE.json();

                if( RESPONSE.status != 200 )
                    return null;

                if( USER )
                    return USER;

                return null;
            }
        } )
    ],
    callbacks: {
        async jwt( { token, user }: any ) {
            return { ...token, ...user };
        },
        async session( { session, token, user }: any ) {
            session.user = token as any;
            
            return session;
        }
    },
    session: {
        jwt: true,
        maxAge: 21600,
    },
}

export default NextAuth( authOptions )