import getConfig from 'next/config'
const config = getConfig();
const { basePath } = config.publicRuntimeConfig;

export default function basePathLoader({ src, width, quality }) {
    return basePath+src;
}