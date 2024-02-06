/**
 * access_token 만료시간, 1hour, ms단위
 */
export const ACCESS_TOKEN_EXPIRATION_TIME = 60 * 60 * 1000

/**
 * refresh_token 만료시간, 7day, ms단위
 */
export const REFRESH_TOKEN_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000

/**
 * refresh_token redis key
 */
export const REFRESH_TOKEN_REDIS_KEY = 'refresh-token'
