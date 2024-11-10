'use client';

import Link from 'next/link';
import User from './User';

import { googleLogin, googleLogout } from '@/libs/firebase/auth';

export default function Navbar() {
	// const userSessionId = useUserSession(session);

	const handleLogin = () => {
		googleLogin();
	};
	const handleLogout = () => {
		googleLogout();
	};
	if (!userSessionId) {
		return (
			<nav>
				<Link href='/' className='logo'>
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

					<button
						onClick={handleLogin}
						className='button special'>
						Login
					</button>
				</menu>
			</nav>
		);
	}

	return (
		<nav>
			<Link href='/' className='logo'>
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

				{userSessionId?.isAdmin && (
					<Link className='button' href='/admin/addnew'>
						Edit
					</Link>
				)}

				<button onClick={handleLogout} className='button special'>
					Logout
				</button>

				<User user={userSessionId} />
			</menu>
		</nav>
	);
}
