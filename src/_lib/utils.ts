import Config from './../config'

const Utils = () => {
  const serializeImages = (url: string) => {
    return `${Config.path}/images/${url}`
  }

  return {
    serializeImages
  }
}

export default Utils