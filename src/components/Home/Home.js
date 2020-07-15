import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Home.css';
import Product from '../Product/Product';

function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        Axios.get('../mock-data.json').then(({ data }) => {
            setProducts([...data]);
        })
    }, []);
    return (
        <div className="home">
            <img
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="home" />

            <div className="home__row">
                {
                    products?.length && products.map(product => <Product key={product.id} {...product} />)
                }
            </div>
        </div>
    )
}

export default Home
