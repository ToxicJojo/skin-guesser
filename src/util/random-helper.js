const getRandomIntBetween = (min, max) => {
  return Math.floor((Math.random() * (max - min)) + min)
}

const getRandomElement = (array) => {
  const randomIndex = getRandomIntBetween(0, array.length - 1)
  return array[randomIndex]
}

const getRandomElementBetween = (array, min, max = array.length) => {
  const randomIndex = getRandomIntBetween(min, max)
  return array[randomIndex]
}

export default {
  getRandomIntBetween,
  getRandomElement,
  getRandomElementBetween,
}
