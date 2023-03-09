/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProductsAction } from "../../actions/actions"

export default function ProductImages({ id = "" }) {
    const navigate = useNavigate()
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
        }, id);
    };


    return (<section className="product_images">
        {!loading && <ul className="">
            {products.map((e, i) => {
                return <li onClick={() => {
                    if (e.dispensary) {
                        navigate(`/${e?.dispensary?._id}/product/${e._id}`)
                    } else {
                        navigate(`/dispensaries`)
                    }
                }} key={i} className="product_image">
                    <img src={e.images[0]} alt={e.name} />
                </li>
            })}
        </ul>}</section>
    )
}