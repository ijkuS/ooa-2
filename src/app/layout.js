import { cookies } from 'next/headers';
import Navbar from './components/Header';
import './globals.css';
import { SESSION_COOKIE_NAME } from '../../constants';

export default function RootLayout({ children }) {
	const sessionCookie = async () => {
		cookies().get(SESSION_COOKIE_NAME);
	};
	const session = sessionCookie ? sessionCookie.value : null;
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
