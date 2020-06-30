import Config from './../config'

const Utils = () => {
  const mountUrlImage = (url: string) => {
    return `${Config.path}/images/${url}`
  }

  return {
    mountUrlImage
  }
}

export default Utils