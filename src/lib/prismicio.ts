import * as prismic from '@prismicio/client';
import { type CreateClientConfig, enableAutoPreviews } from '@prismicio/svelte/kit';
import config from '../../slicemachine.config.json';
import { PUBLIC_PRISMIC_DESIGNS_REPO } from '$env/static/public';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = import.meta.env.VITE_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig['routes'] = [
	// Examples:
	// {
	// 	type: "homepage",
	// 	path: "/",
	// },
	// {
	// 	type: "page",
	// 	path: "/:uid",
	// },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = ({ cookies, ...config }: CreateClientConfig = {}) => {
	const client = prismic.createClient(PUBLIC_PRISMIC_DESIGNS_REPO, {
		routes,
		...config
	});

	enableAutoPreviews({ client, cookies });

	return client;
};
