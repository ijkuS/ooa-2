'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import User from './User';
import {
	OnUserStateChange,
	googleLogin,
	googleLogout,
} from '../libs/firebase/auth';
import { useUserSession } from '../hooks/use-user-session';
import { createSession, removeSession } from '../actions/auth-actions';

export default function Navbar({ session }) {
	const userSessionId = useUserSession(session);

	const handleLogin = async () => {
		const userId = await googleLogin();
		if (userId) {
			await createSession(userId);
		}
	};
	const handleLogout = async () => {
		await googleLogout();
		await removeSession();
	};
	if (!userSessionId) {
		return (
			<nav>
				<Link href='/' className='logo'>
					<img
						className='logo-image'
						src='/ooa-logo.svg'
						alt='logo'
					/>
				</Link>
				<menu className='main-menu'>
					<Link className='button' href='/products/all'>
						All Products
					</Link>
					<button
						onClick={handleLogin}
						className='button special'>
						Login
					</button>
				</menu>
			</nav>
		);
	}

	return (
		<nav>
			<Link href='/' className='logo'>
				<img
					className='logo-image'
					src='/ooa-logo.svg'
					alt='logo'
				/>
			</Link>
			<menu className='main-menu'>
				<Link className='button' href='/products/all'>
					All Products
				</Link>
				<Link className='button' href='/cart'>
					Bag
				</Link>
				<button onClick={handleLogout} className='button special'>
					Logout
				</button>
			</menu>
		</nav>

		// <nav>
		// 	<Link href='/' className='logo'>
		// 		<img
		// 			className='logo-image'
		// 			src='/ooa-logo.svg'
		// 			alt='logo'
		// 		/>
		// 	</Link>
		// 	<menu className='main-menu'>
		// 		<Link className='button' href='/products/all'>
		// 			All Products
		// 		</Link>
		// 		{user && (
		// 			<Link className='button' href='/cart'>
		// 				Bag
		// 			</Link>
		// 		)}
		// 		{userId?.isAdmin && (
		// 			<Link className='button' href='/addnew'>
		// 				Edit
		// 			</Link>
		// 		)}

		// 		{!user && (
		// 			<button
		// 				onClick={handleLogin}
		// 				className='button special'>
		// 				Login
		// 			</button>
		// 		)}
		// 		{user && (
		// 			<button
		// 				onClick={handleLogout}
		// 				className='button special'>
		// 				Logout
		// 			</button>
		// 		)}
		// 		{user && <User user={user} />}
		// 	</menu>
		// </nav>
	);
}
