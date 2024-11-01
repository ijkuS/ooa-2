import React from 'react';

export default function User({ user }) {
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
