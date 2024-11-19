// import useUserSession from '@/hooks/use-user-session';
import React from 'react';

export default function CartPage() {
	// const { user, role, login, logout } = useUserSession();

	return (
		<section className='cart__page-container'>
			<h2 className='page-title'>Your Bag</h2>
			<div className='sub-wrapper'>
				<div className='preview-image__holder'></div>
			</div>
		</section>
	);
}
