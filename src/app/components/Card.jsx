
import Image from 'next/image';
import { useStateContext } from './StateContext';
import './all.css';
import Link from 'next/link';
import img from '../../../public/imgs/1.jpg';
const Card = ({ tittle, desc, price, _id }) =>
{


    const { setTotalQty, totalQty, AddtoCart, } = useStateContext();





    return (
        <div className="card" >
            <div className="ima">
                <Image alt='' src={img} />
            </div>
            <div className="text">
                <p className="title">{tittle}</p>
                <p className="desc">{desc}</p>
                <Link href={`/product/${_id}`} className='details'>Details</Link>
                <div className="btns">
                    <button className='add' id={_id} onClick={(e) =>
                    {
                        AddtoCart(e.target.id);
                    }}>add to cart</button>
                    <Link href={`/product/${_id}`} className='buy'>Buy Now</Link>
                </div>
                <p className="price">{price}$</p>
            </div>
        </div >
    );
};

export default Card;