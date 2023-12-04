'use client';
import Card from './Card';
import { useStateContext } from './StateContext';
import './styles/Categories.css';

const Categories = ({ category, products }) =>
{

  const { scrollL, scrollR } = useStateContext();

  return (
    <>
      <hr />
      <h1>{category}</h1>
      <div className="cat" >
        <button className='scroll-left' onClick={scrollL}>&#10140;</button>
        <div className="cat-cards" >
          {products.map(product => product.category == category ? <Card key={product._id} _id={product._id} tittle={product.title} price={product.price} desc={product.description} img={product.image} /> : null
          )}
        </div>
        <button className='scroll-right' onClick={scrollR}>&#10140;</button>
      </div>
    </>
  );
};

export default Categories;