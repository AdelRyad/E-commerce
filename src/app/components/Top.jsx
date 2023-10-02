
import Image from 'next/image';
import './all.css';
import Link from 'next/link';
import Logo from '../../../public/imgs/5.jpg';

export const Top = () =>
{

  return (
    <>
      <div className="Top">
        <div className='txt'>
          <h1>Best Selling</h1>
          <p>Lorem ipsum dolor, earum aliquam libero et nam harum minus rem inventore at.</p>
          <Link href={'/'} className='buynow'>Buy Now</Link>
        </div>
        <div className="img">
          <Image alt='asd' src={Logo} width={0} height={0} priority />
        </div>
      </div>
    </>
  );
};
export default Top;