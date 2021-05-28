const axios = require('axios');

module.exports = async ( props ) => {
  /*
   *  Verify required variables are present
   */
  if((!process.env.MUTKO_APP_ID || !process.env.MUTKO_APP_KEY) && (!props.APP_ID || !props.APP_KEY)){
    throw({
      code: "MUTKO_MISSING_CREDENTIALS",
      message: "Mutko API credentials missing.",
      details: "MUTKO_MISSING_CREDENTIALS"
    })
  }
  /*
   *  Do request
   */
  try {
    const req = await axios({
      ...props,
      baseURL: 'https://mutko.fi/api',
      headers: {
        ...props.headers,
        'accept': 'application/json',
        'x-app-id': props.APP_ID || process.env.MUTKO_APP_ID,
        'x-app-key': props.APP_KEY || process.env.MUTKO_APP_KEY
      }
    })
    return req.data
   }catch(ex){
      throw({
        ...ex,
        details: (typeof ex.response.data === "string")? ex.response.data : JSON.stringify(ex.response.data)
      })
   }
}
