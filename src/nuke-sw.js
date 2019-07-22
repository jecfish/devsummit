function run() {
  // Is this actually being executed in a ServiceWorker?
  if (!(self instanceof ServiceWorkerGlobalScope)) {
    return;
  }
  // Nuke the service worker.
  await self.registration.unregister();

  // Reload all open pages.
  self.clients.matchAll().then(clients => {
    clients
      .filter(client => client.type === 'window')
      .forEach(client => client.navigate('/'));
  });
}
run();
