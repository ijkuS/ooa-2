'use client';

import { atom } from 'recoil';

export const userState = atom({
	key: 'userState',
	default: null,
});

export const roleState = atom({
	key: 'roleState',
	default: 'visitor',
});
