"use client"
import Image from "next/image"
import image_product from '../../../public/image_product.jpg'
import { useState } from "react"
import Link from "next/link"

const Product = () => {
    const [productList, setProductList] = useState(Array(10).fill(0))

    return (
        <>
            <div className="row gap-2">
                {
                    productList.map((item: any, index:number) => {
                        return (
                            <div className="card" style={{ width: "16rem" }} key={index}>
                                <Image src={image_product} className="card-img-top w-100 h-50 mt-2" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card {index + 1}</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <Link href="/" className="btn btn-outline-warning fw-bold">Add to cart</Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Product