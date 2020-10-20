const wait = async (amount) => {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve, amount)
  })
}

export default wait
