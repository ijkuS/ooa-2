import { NextResponse } from 'next/server';
import {
	ADMIN_ADDNEW_ROUTE,
	ADMIN_DASHBOARD_ROUTE,
	ADMIN_ROOT_ROUTE,
	CART_ROUTE,
	PUBLIC_HOME_ROUTE,
	SESSION_COOKIE_NAME,
} from './routes/middleware-constants';
import { firebaseAdminConfig } from './libs/firebase/config';

const adminOnlyRoutes = [
	ADMIN_ADDNEW_ROUTE,
	ADMIN_ROOT_ROUTE,
	ADMIN_DASHBOARD_ROUTE,
];
const memberOnlyRoutes = [CART_ROUTE];
// const publicHomeRoutes = [PUBLIC_HOME_ROUTE];

export default function middleware(request) {
	const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

	// console.log('⭐️request:', request);
	// console.log('🍪 1st sessionCookie:', sessionCookie);

	// If there's no session cookie,
	// redirect unauthenticated users trying to access protected routes
	if (!sessionCookie) {
		try {
			if (
				adminOnlyRoutes.includes(request.nextUrl.pathname) ||
				memberOnlyRoutes.includes(request.nextUrl.pathname)
			) {
				console.log(
					'No session cookie, and you are not authenticated'
				);
				return NextResponse.redirect(
					new URL(PUBLIC_HOME_ROUTE, request.url)
				);
			}
		} catch (error) {
			console.log(
				error,
				'No session cookie, there is something wrong'
			);
		}
		return NextResponse.next();
	}

	try {
		const sessionData = JSON.parse(decodeURIComponent(sessionCookie));
		// console.log('-------------------------------------');
		// console.log('🍪🍪 2nd sessionCookie:', sessionCookie);
		// console.log('🍎 1st Session data:', sessionData); // user
		// console.log('🍎 sessionData.uid: ', sessionData.uid);
		// console.log('⭐️⭐️ SessionData.role is...', sessionData.role); // 현재 uid정보가 나옴

		const adminUid = firebaseAdminConfig.adminUid;

		if (
			adminOnlyRoutes.includes(request.nextUrl.pathname) &&
			sessionData.uid !== adminUid
		) {
			return NextResponse.redirect(
				new URL(PUBLIC_HOME_ROUTE, request.url)
			);
		}
		if (
			memberOnlyRoutes.includes(request.nextUrl.pathname) &&
			sessionData.user.isAnonymous !== false
		) {
			// console.log('🍎🍎🍎🍎🍎 Session data for member:', sessionData);
			// console.log('🍎🍎🍎🍎🍎', sessionData.user.uid); // undefined

			// console.log('🍎🍎🍎🍎🍎', sessionData.user.isAnonymous); // undefined
			// console.log(
			// 	'sessionData exist, but sessionData.isAnonymous is wrong'
			// );
			return NextResponse.redirect(
				new URL(PUBLIC_HOME_ROUTE, request.url)
			);
		}
		return NextResponse.next();
	} catch (error) {
		console.log(
			error,
			'session cookie exist, but there is something wrong'
		);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/cart', '/admin/:path*'],
};
