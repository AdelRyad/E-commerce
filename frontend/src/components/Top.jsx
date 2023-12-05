import './styles/Top.css';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

export const Top = async () =>
{

  const fetch = await axios.get(`http://localhost:3001/product/65204a3e286f54714c6ddf65`);
  const product = fetch.data;

  return (
    <>
      <div className="Top">
        <div className='txt'>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <Link href={`/product/${product._id}`} className='buynow'>Buy Now</Link>
        </div>
        <div className="img">
          <Image key={product._id} alt='asd' src={product.image} width={1000} height={1000} quality={100} />
        </div>
      </div>
    </>
  );
};
export default Top;