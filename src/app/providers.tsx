'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/hooks/use-auth';
import { SharedStateProvider } from '@/hooks/use-shared-state';

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <SharedStateProvider>
                    {children}
                </SharedStateProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}
