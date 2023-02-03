
import React from "react"
import mainImage from "../../public/images/blueDream.jpg"

export default function ProductImages() {
    const DATA = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "",]
    return (<section className="product_images">
        <ul className="">
            {DATA.map((e, i) => {
                return <li key={i} className="product_image">
                    <img src={mainImage} alt="" />
                </li>
            })}
        </ul></section>
    )
}