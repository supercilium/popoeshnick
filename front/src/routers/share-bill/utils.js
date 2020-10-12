
// eslint-disable-next-line no-useless-escape
export const itemsRegexp = /([^;,.]+)(,[\d\.]+){1,};*/gm


/**
 * Parse string from format 
 * @param {String} str 
 */
export const parseItems = (str) => {
    const items = str.split(';')
    return items.map((item) => {
      const [name, price, quantity = 1, discount = 0] = item.split(',')
      return ({
        name,
        price: Number(price),
        quantity: Number(quantity),
        discount: Number(discount),
      })
    })
  }
  
export const parseUsers = str => str.split(',')
