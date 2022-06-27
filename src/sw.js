self.addEventListener('install', event => {
  console.log('[SW]: install')
})
self.addEventListener('activate', event => {
  console.log('[SW]: activate')
})

self.onmessage = ({ data: { question } }) => {
  self.postMessage({
    answer: 42,
  });
};