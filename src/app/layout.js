import './globals.css';
import Navbar from '@/components/Header';

export default async function RootLayout({ children }) {
	return (
		<html>
			<body>
				<main className='main-wrapper'>
					<Navbar />
					{children}
				</main>
			</body>
		</html>
	);
}
