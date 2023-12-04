

import Categories from './Categories';
import axios from 'axios';
import './styles/Recomended.css';


const Recomended = async () =>
{
  const categories = [];
  const products = await axios.get('http://localhost:3001/products');
  products.data.map(pro => categories.includes(pro.category) ? null : categories.push(pro.category));

  return (
    <div className='Recomended'>
      <div className="cards">
        {categories.map(category => <Categories key={category} category={category} products={products.data} />)}
      </div>
    </div>
  );
};

export default Recomended;