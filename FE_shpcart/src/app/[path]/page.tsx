"use client"
import { usePathname } from "next/navigation"
import Cart from "@/component/ManageCart/Cart"
import Product from "@/component/ManageProduct/Product"

const AppRoutePage = () => {
    const pathname = usePathname()

    switch (pathname) {
        case '/product':
            return <Product />
        case '/cart':
            return <Cart />
        default:
            return <div className='container'>404 not found shoping cart...!</div>
    }
}

export default AppRoutePage