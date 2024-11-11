import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default function handler(req, res) {
	console.log(req, res, 'This is from remove-session-handler');
	res.setHeader(
		'set-Cookie',
		`${SESSION_COOKIE_NAME}=${encodeURIComponent(
			sessionData
		)}; HttpOnly; Path=/; Max-Age=0;`
	);
	res.status(200).json({ success: true });
}
