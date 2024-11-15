import useUserSession from '@/hooks/use-user-session';
import Link from 'next/link';
import React from 'react';

export default function adminDashboard() {
	const { user, role } = useUserSession();

	return (
		<section className='admin-dashboard__container'>
			<h2>Dashboard</h2>
			<div>
				{user ? (
					<p>
						Welcome, {user.displayName}. Your role is: {role}
					</p>
				) : (
					<p>Please log in to access the dashboard.</p>
				)}
			</div>
			<div>
				{user && (
					<Link className='button special' href='/admin/addnew'>
						Add New Product
					</Link>
				)}
			</div>
		</section>
	);
}
