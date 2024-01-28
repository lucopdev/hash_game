const throwDisplayMessage = (setter: React.Dispatch<React.SetStateAction<string>>, text: string): void => {
  setter(text);
  setTimeout(() => {
    setter('');
  }, 7000);
};

export default throwDisplayMessage;