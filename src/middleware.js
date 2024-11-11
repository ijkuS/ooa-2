import {
	ADMIN_ADDNEW_ROUTE,
	ADMIN_ROOT_ROUTE,
	CART_ROUTE,
	PUBLIC_HOME_ROUTE,
} from './routes/middleware-constants';

const adminOnlyRoutes = [ADMIN_ADDNEW_ROUTE, ADMIN_ROOT_ROUTE];
const memberOnlyRoutes = [CART_ROUTE];
const publicHomeRoutes = [PUBLIC_HOME_ROUTE];

export default function middleware(request) {}
