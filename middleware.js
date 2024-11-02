import { NextResponse } from 'next/server';
import {
	CART_ROUTE,
	HOME_ROUTE,
	ROOT_ROUTE,
	SESSION_COOKIE_NAME,
} from './constants';

const protectedRoutes = [EDIT_ROUTE, CART_ROUTE];

export default function middleware(request) {
	const sessionCookie = async () => {
		request.cookies.get(SESSION_COOKIE_NAME);
	};

	const session = sessionCookie ? sessionCookie.value : null;

	// Redirect to login if session is not set
	if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
		const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}

	// Redirect to home if session is set and user tries to access root
	if (session && request.nextUrl.pathname === EDIT_ROUTE) {
		const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}
}
