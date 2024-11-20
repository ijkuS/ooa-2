import RecoilRootProvider from '@/utils/RecoilRootProvider';
import './globals.css';
import Navbar from '@/components/Header';

export default async function RootLayout({ children }) {
	// const storedCookies = await cookies();
	// const session = storedCookies.get(SESSION_COOKIE_NAME)?.value;
	return (
		<html>
			<body>
				<RecoilRootProvider>
					<main className='main-wrapper'>
						<Navbar />
						{children}
					</main>
				</RecoilRootProvider>
			</body>
		</html>
	);
}
