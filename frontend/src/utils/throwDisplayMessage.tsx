const throwDisplayMessage = (
  setter: React.Dispatch<React.SetStateAction<string>>,
  text: string
) => {
  setter(text);
  // essa função tem que enviar um io.emit
  setTimeout(() => {
    setter('');
  }, 7000);
};

export default throwDisplayMessage;