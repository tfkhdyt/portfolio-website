export const trackEvent = (eventName: string, eventType = 'click') => {
  if (window.umami && typeof window.umami.trackEvent === 'function') {
    window.umami.trackEvent(eventName, eventType);
  }
};
