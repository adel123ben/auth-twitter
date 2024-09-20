// a file to wrrite all the route that cant bes in the application to manage for the auth (protected routes) and public routes




/**
 * this is the public route so is accesible for all the public
 * this route dos not require to be logged in
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
];


/**
 * this is the route use for login or register
 * this route is for auth (not protected)
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];



/**
 * this is the prefixe route for next-auth
 * this route need to be public and accesible for all the public
 * @type {string}
 */
export const authPrefixe = "/api/auth";




/**
 * this is the route that the user will be redirected after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";