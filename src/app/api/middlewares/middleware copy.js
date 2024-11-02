import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { adminUser } from '../fbase';
import { NextResponse } from 'next/server';

const protectedRoutes = {
	adminOnly: ['/addnew'],
	membersOnly: ['/cart'],
};
// const publicRoutes = ['/', '/products/all', ]

export async function middleWare(request) {
	const auth = getAuth();
	let user = null;
	let isAdmin = false;

	//check authentication status
	await new Promise((resolve) => {
		onAuthStateChanged(auth, async (fbaseUser) => {
			if (fbaseUser) {
				user = fbaseUser;
				const userData = await adminUser(user);
				isAdmin = userData.isAdmin;
			}
			resolve();
		});
	});
	//Get the current route path
	const path = request.nextUrl.pathname;

	// Admin-only route protection
	if (protectedRoutes.adminOnly.includes(path)) {
		if (!user || !isAdmin) {
			return NextResponse.redirect(
				new URL('/error-auth', request.url)
			);
		}
	}
	// Members-only route protection (including admins)
	if (protectedRoutes.membersOnly.includes(path)) {
		if (!user) {
			return NextResponse.redirect(
				new URL('/error-auth', request.url)
			);
		}
	}
	//allow access if th euser meets the conditions
	return NextResponse.next();
}
export const config = {
	matcher: ['/addnew', '/cart'],
};
