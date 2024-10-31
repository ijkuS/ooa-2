import Link from 'next/link';
import React from 'react';

export default function Navbar() {
	return (
		<nav>
			<Link href='/' className='logo'>
				{/* <Image
					className='logo-image'
					src='/ooa-logo.svg'
					alt='ooa logo'
					width={180}
					height={38}
					priority
				/> */}
				<img
					className='logo-image'
					src='/ooa-logo.svg'
					alt='logo'
				/>
			</Link>
			<menu className='main-menu'>
				<Link className='button' href='/products/all'>
					All Products
				</Link>
				<Link className='button' href='/cart'>
					Bag
				</Link>
				<Link className='button' href='/products/addnew'>
					Edit
				</Link>
				<button className='button special'>SIGN IN</button>
				{/* <Link className='button'>SIGN IN</Link> */}
			</menu>
		</nav>
	);
}
