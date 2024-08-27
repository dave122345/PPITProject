import axios from 'axios'

export async function fetcher (url) {
    const {data} = await axios.get(url)
    return data
}