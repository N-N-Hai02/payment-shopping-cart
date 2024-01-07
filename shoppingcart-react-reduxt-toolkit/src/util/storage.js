const SP_CART_STORAGE_KEY = 'SP_CART'

export default {
    get() {
        return JSON.parse(localStorage.getItem(SP_CART_STORAGE_KEY)) || []
    },
    set(cart) {
        localStorage.setItem(SP_CART_STORAGE_KEY, JSON.stringify(cart))
    }
}

