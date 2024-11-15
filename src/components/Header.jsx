import Link from 'next/link';
import User from './User';

import useUserSession from '@/hooks/use-user-session';

export default function Navbar() {
	const { user, role, login, logout } = useUserSession();

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

				{role === 'member' && (
					<Link className='button' href='/cart'>
						Bag
					</Link>
				)}

				{role === 'admin' && (
					<Link className='button' href='/admin/dashboard'>
						Edit
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
			</menu>
		</nav>
	);
}
