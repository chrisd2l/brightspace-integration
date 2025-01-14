
'use strict';

const cors = require('@koa/cors');

/*
 Sets up the es-dev-server to work with requests that come from the LMS for both web component resources and other assets.
 We want to serve the web components unbundled from source but continue to serve the other assets from the build folder.
 So the rewrite middleware rewrites any path that starts with es6-bundled with the es6-bundled prefix removed, so
 it is served from the root of the project.
 Other paths are prefixed with /build to serve from the dist folder.
*/

module.exports = {
	hostname: 'localhost',
	port: 8080,
	compatibility: 'modern',
	preserveSymlinks: true,
	customMiddlewares: [
		cors(),
		function rewrite(context, next) {
			let url;
			if (context.url.startsWith('/es6-bundled/')) {
				url = context.url.replace(/\/es6-bundled/, '');
			} else {
				url = '/build' + context.url;
			}
			context.url = url;

			return next();
		}
	],
};
