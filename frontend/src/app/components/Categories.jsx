
import Card from './Card';
import { useStateContext } from './StateContext';

const Categories = ({ category }) =>
{

  const { products, scrollL, scrollR, removeScroll } = useStateContext();

  return (
    <>
      <h1>{category}</h1>
      <div className="cat" onLoad={removeScroll}>
        <button className='scroll-left' onClick={scrollL}></button>
        <div className="cat-cards" >
          {products.map(product => product.category == category ? <Card key={product._id} _id={product._id} tittle={product.tittle} price={product.price} desc={product.desc} /> : null
          )}
        </div>
        <button className='scroll-right' onClick={scrollR}></button>
      </div>
    </>
  );
};

export default Categories;