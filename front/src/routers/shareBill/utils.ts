
// eslint-disable-next-line no-useless-escape
export const itemsRegexp = /([^;,.]+)(,[\d\.]+){1,};*/gm


export interface ItemInterface {
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

/**
 * Parse string from format 
 * @param {String} str 
 */
export const parseItems = (str: string): ItemInterface[] => {
  if (!str?.length) {
    return ([{
      name: 'Some food',
      price: 0,
      quantity: 1,
      discount: 0,
    }])
  }
  const items = str.split(';')
  return items.map(parseItem)
}

export const parseItem = (str: string): ItemInterface => {
  if (!str?.length) {
    return ({
      name: 'Some food',
      price: 0,
      quantity: 1,
      discount: 0,
    })
  }
  const [name, price = 0, quantity = 1, discount = 0] = str.split(',')
  return ({
    name: name || 'Some food',
    price: Number(price) || 0,
    quantity: Number(quantity) || 1,
    discount: Number(discount) || 0,
  })
}

export const parseUsers = (str: string): string[] => str.split(',')
