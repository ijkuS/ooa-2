import { SESSION_COOKIE_NAME } from '@/routes/middleware-constants';

export default function handler(req, res) {
	try {
		const { user, uid, role } = req.body;
		console.log('🍎🍎🍎 req.body:', req.body);

		const maxAge = 60 * 60 * 24; // one day
		const sessionData = JSON.stringify({ user, uid, role });

		console.log('🍎🍎🍎 Setting session cookie with data:', sessionData);

		res.setHeader(
			'set-Cookie',
			`${SESSION_COOKIE_NAME}=${encodeURIComponent(
				sessionData
			)}; HttpOnly; Path=/; Max-Age=${maxAge}`
		);
		return res.status(200).json({ success: true });
	} catch (error) {
		console.error('Error setting session:', error);
		res.status(500).json({
			success: false,
			error: 'Failed to set session.',
		});
	}
}
