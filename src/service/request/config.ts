let BASE_URL = ''
let BASE_NAME = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://tomatosix.org/prod'
  BASE_NAME = 'kobe'
} else {
  BASE_URL = 'http://tomatosix.org/test'
  BASE_NAME = 'james'
}

export { BASE_URL, BASE_NAME, TIME_OUT }
