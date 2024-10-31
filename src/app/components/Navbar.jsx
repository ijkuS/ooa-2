import Link from 'next/link';
import React from 'react';

export default function Navbar() {
	return (
		<nav>
			<Link href='/'>OOA</Link>
			<menu>
				<Link className='button' href='/products/all'>
					All Products
				</Link>
				<Link className='button' href='/cart'>
					Bag
				</Link>
				<Link className='button' href='/products/addnew'>
					Edit
				</Link>
				<button>SIGN IN</button>
				{/* <Link className='button'>SIGN IN</Link> */}
			</menu>
		</nav>
	);
}
