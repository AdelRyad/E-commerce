'use client';
import { useStateContext } from '../../components/StateContext';
import Link from 'next/link';
import Image from 'next/image';

const Products = ({ category }) =>
{
    const { deleteProduct, scrollL, scrollR, products } = useStateContext();

    return (
        <>
            <h1>{category}</h1>
            <div className="cat">
                <button className='scroll-left' onClick={scrollL}>&#10140;</button>
                <div className="cat-cards" >
                    {products.map(product => product.category == category ?
                        <div key={product._id} className="card">
                            <Image src={product.image} width={1000} height={1000} quality={100} className="ima" />
                            <div className="admin-text">
                                <p className="title">tittle:  {product.title}</p>
                                <p className="category">category:  {product.category}</p>
                                <p className="desc">description:  {product.description}</p>
                                <p className="price">{product.price}$</p>
                                <div className="btns">
                                    <Link href={`/edit/${product._id}`} className='add' id={product._id}>Edit &#10140;</Link>
                                    <button className='delete' id={product._id} onClick={(e) =>
                                    {
                                        deleteProduct(e.target.id);
                                    }
                                    }>Delete</button>
                                </div>
                            </div>
                        </div >
                        : null)}
                </div>
                <button className='scroll-right' onClick={scrollR}>&#10140;  </button>
            </div >
        </>
    );
};


export default Products;