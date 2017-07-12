const Q = require('q');

// Retries the given callback until the underlying promise succeeds or the timeout (ms) is exceeded. The wait time
// is the delay between tries.
// NOTE: This is not the same as browser.wait() which only waits once and does not retry.
module.exports = function (callback, {timeout = 20000, wait = 1000} = {}) {
  const df = Q.defer();
  const startDate = new Date();
  function run() {
    callback().then(df.resolve, err => {
      const runtime = new Date().getTime() - startDate.getTime();
      if (runtime >= timeout) {
        df.reject(err);
      } else {
        console.log('Retrying...');
        setTimeout(run, wait);
      }
    });
  }
  run();
  return df.promise;
};
