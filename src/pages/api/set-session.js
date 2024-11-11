import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default function handler(req, res) {
	const { uid, role } = req.body;
	const maxAge = 60 * 60 * 24; // one day
	const sessionData = JSON.stringify({ uid, role });
	console.log(req, res, 'This is from set-session-handler');

	res.setHeader(
		'set-Cookie',
		`${SESSION_COOKIE_NAME}=${encodeURIComponent(
			sessionData
		)}; HttpOnly; Path=/; Max-Age=${maxAge}`
	);
	res.status(200).json({ success: true });
}
