const deleteCookies = (names: string[], paths: string[]) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    names.forEach((name) => {
      paths.forEach((path) => {
        if (cookie.includes(name)) {
          document.cookie = `${name}=Max-Age=0; Path=${path}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        }
      });
    });
  }
}

export default deleteCookies;