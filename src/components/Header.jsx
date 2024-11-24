'use client';
import Link from 'next/link';
import User from './User';

import useUserSession from '@/hooks/use-user-session';
import CartStatus from './CartStatus';
import useCart from '@/hooks/useCart';

export default function Navbar() {
	const { user, role, login, logout } = useUserSession();
	// const { addOrUpdateCartMutation } = useCart();

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
					All
				</Link>

				{role === 'admin' && (
					<Link className='button' href='/admin/dashboard'>
						Admin
					</Link>
				)}

				{user ? (
					<button onClick={logout} className='button special'>
						Logout
					</button>
				) : (
					<button onClick={login} className='button special'>
						Login
					</button>
				)}
				{user && <User user={user} />}

				{user && (
					<Link className='icons cart' href='/cart'>
						<CartStatus />
					</Link>
				)}
			</menu>
		</nav>
	);
}
