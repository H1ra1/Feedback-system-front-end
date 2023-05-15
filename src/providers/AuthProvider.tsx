'use client'

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface ProviderProps {
    children: ReactNode
}

function AuthProvider( { children }: ProviderProps ) {
    return <SessionProvider>{ children }</SessionProvider>
}

export default AuthProvider;