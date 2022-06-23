import SanityClient from '@sanity/client';

export default SanityClient({
	projectId: 'g0b1zybn',
	dataset: 'production',
	apiVersion: 'v2021-08-31',
	useCdn: false,
});
