'use client';
import Image from 'next/image';
import { useStateContext } from './StateContext';
import './styles/Card.css';
import Link from 'next/link';

const Card = ({ tittle, price, _id, img }) =>
{

    const { AddtoCart } = useStateContext();

    return (
        <div className='card' >
            <Image key={_id} alt='' src={img} width={1000} height={1000} quality={100} className="ima" />
            <div className="text">
                <p className="title">{tittle}</p>
                <div className="btns">
                    <p className="price">{price}$</p>
                    <Link href={`/product/${_id}`} className='buy'>Details &#10140;</Link>
                    <button id={_id} className='add' onClick={(e) =>
                    {
                        AddtoCart(e.target.id);
                    }}>
                        <svg id={_id} onClick={(e) =>
                        {
                            AddtoCart(e.target.id);
                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path id={_id} onClick={(e) =>
                        {
                            AddtoCart(e.target.id);
                        }} d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                    </button>

                </div>
            </div>

        </div >
    );
};

export default Card;