"use client"
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderPage from '@/component/Header'
import FooterPage from '@/component/Footer'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <HeaderPage />
                <div className='container my-4'>
                    {children}
                    <div className='vh-100'></div>
                </div>
                <FooterPage />
            </body>
        </html>
    )
}
