import { cookies } from 'next/headers';
import './globals.css';
import Navbar from '@/components/Header';
import { SESSION_COOKIE_NAME } from '@/middleware_constants';

export default async function RootLayout({ children }) {
	const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
	return (
		<html>
			<body>
				<main className='main-wrapper'>
					<Navbar initialUser={currentUser?.toJSON()} />
					{children}
				</main>
			</body>
		</html>
	);
}
