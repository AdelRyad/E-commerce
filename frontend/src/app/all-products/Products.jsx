
import { useStateContext } from '../components/StateContext';
import Link from 'next/link';
import { useEffect } from 'react';

const Products = ({ category }) =>
{
    const { products, deleteProduct, scrollL, scrollR, removeScroll } = useStateContext();
    useEffect(() =>
    {
        removeScroll();
    }, []);

    return (
        <>
            <h1>{category}</h1>
            <div className="cat">
                <button className='scroll-left' onClick={scrollL}></button>
                <div className="cat-cards" >
                    {products.map(product => product.category == category ?
                        <div key={product._id} className="card">
                            <div className="ima"></div>
                            <div className="text">
                                <p className="title">tittle: {product.tittle}</p>
                                <p className="title">category: {product.category}</p>
                                <p className="desc">description: {product.desc}</p>
                                <p className="title">price: {product.price}</p>
                                <div className="btns">
                                    <Link href={`/edit/${product._id}`} className='add' id={product._id}>Edit</Link>
                                    <button className='buy' id={product._id} onClick={(e) =>
                                    {
                                        deleteProduct(e.target.id);
                                    }
                                    }>Delete</button>
                                </div>
                                <p className="price">{product.price}$</p>
                            </div>
                        </div >
                        : null)}
                </div>
                <button className='scroll-right' onClick={scrollR}></button>
            </div >
        </>
    );
};


export default Products;