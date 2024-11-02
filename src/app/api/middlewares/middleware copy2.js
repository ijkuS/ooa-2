import { getAuth } from 'firebase/auth';
import { NextResponse } from 'next/server';

const protectedRoutes = {
	adminOnly: ['/addnew'],
	membersOnly: ['/cart'],
};
const publicRoutes = ['/', '/products'];

export async function middleware(req) {
	const response = NextResponse.next();

	if (req.nextUrl.pathname.startsWith('/addnew')) {
		console.log('middleware: adminOnly');
		if (!req.cookies.get('auth')) {
			return NextResponse.redirect(new URL('/', req.url)); // go back to home
		}
	}
	if (req.nextUrl.pathname.startsWith('/cart')) {
		console.log('middleware: membersOnly');
	} else {
		return response;
	}
}

// Configuring middleware to apply to specific routes
export const config = {
	matcher: ['/addnew', '/cart'],
};
