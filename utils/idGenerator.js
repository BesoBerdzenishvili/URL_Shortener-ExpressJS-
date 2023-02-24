exports.generateId = () => {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 7;
  let id = "";

  for (let i = 0; i < idLength; i++) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return id;
};
