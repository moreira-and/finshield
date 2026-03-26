import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  const pepperedPassword = addPepperToPassword(password);

  return await bcryptjs.hash(pepperedPassword, rounds);
}

function getNumberOfRounds() {
  return process.NODE_ENV === "production" ? 14 : 1;
}

function addPepperToPassword(password) {
  const pepper = process.env.PEPPER;
  return password + pepper;
}

async function compare(providedPassword, storedPassword) {
  const pepperedPassword = addPepperToPassword(providedPassword);
  return await bcryptjs.compare(pepperedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
