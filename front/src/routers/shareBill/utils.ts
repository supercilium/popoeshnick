
// eslint-disable-next-line no-useless-escape
export const itemsRegexp = /([^;,.]+)(,[\d\.]+){1,};*/gm


/**
 * Parse string from format 
 * @param {String} str 
 */
export const parseItems = (str: string) => {
    if (!str?.length) {
        return ([{
            name: '',
            price: 0,
            quantity: 0,
            discount: 0,
            }])
    }
    const items = str.split(';')
    return items.map((item) => {
      const [name, price = 0, quantity = 1, discount = 0] = item.split(',')
      return ({
        name,
        price: Number(price),
        quantity: Number(quantity),
        discount: Number(discount),
      })
    })
  }
  
export const parseUsers = (str: string): string[] => str.split(',')
