'use server';

export async function createSession(user, uid, role) {
	try {
		const response = await fetch('/api/set-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user, uid, role }),
		});
		if (!response.ok) {
			console.log('response is not okay: set-session');
		}
		console.log('Session created successfully');
	} catch (error) {
		console.error('Error creating session:', error);
	}
}

export async function removeSession() {
	try {
		const response = await fetch('/api/remove-session', {
			method: 'POST',
		});
		if (!response.ok) {
			console.log('Failed to remove session');
		}
		console.log('Session removed successfully');
	} catch (error) {
		console.error('Error removing session:', error);
	}
}
