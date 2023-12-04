'use client';
import './all.css';
import { useStateContext } from './StateContext';
import Categories from './Categories';


const Recomended = () =>
{
  const { categories } = useStateContext();

  return (
    <div className='Recomended'>
      <div className="cards">
        {categories.map(category => <Categories key={category} category={category} />)}
      </div>
    </div>
  );
};

export default Recomended;