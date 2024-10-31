'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { OnUserStateChange, googleLogin, googleLogout } from '../api/fbase';

export default function Navbar() {
	//set user
	const [user, setUser] = useState();
	const handleLogin = () => {
		googleLogin().then(setUser);
	};
	const handleLogout = () => {
		googleLogout().then(setUser);
	};
	//useEffect(()=>{},[]) : basic structure of useEffect
	useEffect(() => {
		OnUserStateChange((user) => {
			console.log(user);
			setUser(user);
		});
	}, []); // call the callback only once when the page is firstly mounted

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
				<Link className='button' href='/products/addnew'>
					Edit
				</Link>
				{!user && (
					<button
						onClick={handleLogin}
						className='button special'>
						Login
					</button>
				)}
				{user && (
					<button
						onClick={handleLogout}
						className='button special'>
						Logout
					</button>
				)}
			</menu>
		</nav>
	);
}
