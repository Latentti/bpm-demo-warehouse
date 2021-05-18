const axios = require('axios');

module.exports = async ( props ) => {
  /*
   *  Verify required variables are present
   */
  if((!process.env.KONTTORI_APP_ID || !process.env.KONTTORI_APP_KEY) && (!props.APP_ID || !props.APP_KEY)){
    throw({
      code: "KONTTORI_MISSING_CREDENTIALS",
      message: "Konttori API credentials missing.",
      details: "KONTTORI_MISSING_CREDENTIALS"
    })
  }
  /*
   *  Do request
   */
  try {
    const req = await axios({
      ...props,
      baseURL: 'https://konttori.latentti.io/api',
      headers: {
        ...props.headers,
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-app-id': props.APP_ID || process.env.KONTTORI_APP_ID,
        'x-app-key': props.APP_KEY || process.env.KONTTORI_APP_KEY
      }
    })
    return req
   }catch(ex){
      throw({
        ...ex,
        details: (typeof ex.response.data === "string")? ex.response.data : JSON.stringify(ex.response.data)
      })
   }
}
