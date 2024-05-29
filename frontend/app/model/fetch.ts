/**
 * @Author: huweijian
 * @Date: 2024-05-23 21:07:48
 * @Desc: 初始化fetch函数
 */
const host = process.env.NEXT_API_URL || 'http://localhost:3721/api/'
export async function get(url:string, params: Record<string, unknown>){
  const querys = []
  for (let key in params) {
     querys.push(`${key}=${params[key]}`)
  }
  let query = ''
  if (query.length) {
    query = '?' + querys.join('&')
  }
  try {
    const data = await fetch(`${host}${url}${query}`, {
      method: 'GET',
      redirect: "follow"
    })
    return data
  } catch (error) {
    console.error(error)
    throw new Error(`调用${url}接口失败`)
  }
  
}

export async function post(url:string, params: Record<string, unknown>){
  try {
    const formdata = new FormData();
    for (let key in params) {
      formdata.append(key, params[key] as string | Blob)
    }
    const data = await fetch(`${host}${url}`, {
      method: "POST",
      body: formdata,
      redirect: "follow"
    })
    return data
  } catch (error) {
    console.error(error)
    throw new Error(`调用${url}接口失败`)
  }
}