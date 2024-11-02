'use server';

import { cookies } from 'next/headers';
import {
	HOME_ROUTE,
	ROOT_ROUTE,
	SESSION_COOKIE_NAME,
} from '../../../constants';
import { redirect } from 'next/dist/server/api-utils';

export async function createSession(uid) {
	cookies().set(SESSION_COOKIE_NAME, uid, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24, // One day,
		path: '/',
	});
	redirect(HOME_ROUTE);
}
export async function removeSession() {
	cookies().delete(SESSION_COOKIE_NAME);
	redirect(ROOT_ROUTE);
}
