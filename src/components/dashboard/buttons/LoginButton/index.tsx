'use client'

import { useSession, signIn, signOut } from 'next-auth/react';

function LoginButon() {
    const { data: session } = useSession()

    return (
        <>
            { session ? 'ta logadoo' : 'num ta logado' }
            <button onClick={ () => signIn() }>login</button>
        </>
    );
}

export default LoginButon;