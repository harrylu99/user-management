import axios from 'axios'

const axiosHelper = {
  axiosGet: async (url) => {
    try {
      const rep = await axios.get(url)
      return { success: true, data: rep.data }
    } catch (error) {
      return { success: false, data: error }
    }
  }
}

export default axiosHelper
