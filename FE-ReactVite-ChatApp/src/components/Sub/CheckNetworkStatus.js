export async function CheckNetworkStatus() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    // const response = await fetch('https://www.google.com/favicon.ico', {
    //   method: 'GET',
    //   signal: controller.signal,
    // });
    const response = await fetch('https://cors-test.codehappy.dev', {
      method: 'GET',
      signal: controller.signal,
    });
    console.log("cleared")
    clearTimeout(timeout);
    if (response.ok) {
      console.log('✅ Backend is reachable');
    } else {
      console.log('⚠ Server error');
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      // Show toast notification or alert on timeout
      alert('Network request timed out. Please try again!');
    } else {
      // Show toast notification or alert for other network errors
      alert('Network error! Please check your internet connection.');
    }
  }
}