/**
 * STORAGE KEY
 * @type {string}
 */
export const STORAGE_KEY = 'pictures3';

// anime q=id:1&sorting=random&ref=fp
// anime girls q=id%3A5&sorting=random&ref=fp
/**
 * API LIST
 * @type {{'anime-girls': string, anime: string}}
 */
export const API_LIST = {
  anime: `https://wallhaven.cc/api/v1/search?apikey=${process.env.WALLHAVEN_ACCESS_KEY}&q=id:1&sorting=random&ref=fp`,
  'anime-girls': `https://wallhaven.cc/api/v1/search?apikey=${process.env.WALLHAVEN_ACCESS_KEY}&q=id%3A5&sorting=random&ref=fp`,
};
