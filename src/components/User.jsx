import React from 'react';

export default function User({ user }) {
	console.log(user, 'this is from User');
	console.log(user.photoURL, user.displayName);
	return (
		<>
			<div className='user-info'>
				<img
					src={user.photoURL}
					alt={user.displayName}
					className='user-photo'
				/>
				{/* <span className='user-name'>{user.displayName}</span> */}
			</div>
		</>
	);
}
