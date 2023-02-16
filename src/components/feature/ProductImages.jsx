
import React, { useEffect, useState } from "react"
import { getProductsAction } from "../../actions/actions"

export default function ProductImages() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        setLoading(true)
        getProductsAction(({ data, error }) => {
            if (error) {
            } else {
                setProducts(data);
            }
            setLoading(false)
        });
    };

    return (<section className="product_images">
        {!loading && <ul className="">
            {products.map((e, i) => {
                return <li key={i} className="product_image">
                    <img src={e.images} alt={e.name} />
                </li>
            })}
        </ul>}</section>
    )
}