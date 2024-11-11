import { cookies } from 'next/headers';
import './globals.css';
import Navbar from '@/components/Header';

export default async function RootLayout({ children }) {
	const storedCookies = await cookies();
	const session = storedCookies.get(SESSION_COOKIE_NAME)?.value;
	return (
		<html>
			<body>
				<main className='main-wrapper'>
					<Navbar session={session} />
					{children}
				</main>
			</body>
		</html>
	);
}
