import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import {
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import _ from 'lodash'

import { validateRegexp } from '../../utils'
import { useBillFormStyles } from './styles'

// eslint-disable-next-line no-useless-escape
const itemsRegexp = /([^;,.]+)(,[\d\.]+){1,};*/gm

const parseItems = (str) => {
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

const CheckboxComponent = ({ label, input, meta }) => (
  <FormControlLabel
    control={(
      <Checkbox
        color="primary"
        {...input}
        {...meta}
      />
    )}
    label={label}
  />
)

CheckboxComponent.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

CheckboxComponent.defaultProps = {
  label: '',
}

const parseUsers = str => str.split(',')

export const ShareBill = () => {
  const [value, setValue] = useState('')
  const [user, setUsers] = useState('')
  const [sums, setSums] = useState([])
  const [users, setUserChecks] = useState(new Map([]))
  const [itemsError, setError] = useState(false)
  const [isVisibleDiscount, changeVisibilityDiscount] = useState(false)
  const [isVisibleQuantity, changeVisibilityQuantity] = useState(false)
  const [isVisibleEqually, changeVisibilityEqually] = useState(false)
  const classes = useBillFormStyles()
  let categoryDividers

  const handleClick = (key, index) => {
    setUserChecks((prevUsers) => {
      const newMap = new Map(prevUsers)
      const item = prevUsers.get(key)
      item.checks[index] = Number(!item.checks[index])
      return newMap.set(key, { name: item.name, checks: item.checks })
    })
  }

  const handleColClick = (key) => {
    setUserChecks((prevUsers) => {
      const newMap = new Map(prevUsers)
      const obj = newMap.get(key)
      if (obj.checks.reduce((sum, item) => sum + item, 0) < obj.checks.length) {
        return newMap.set(key, { name: obj.name, checks: obj.checks.map(() => 1) })
      }
      return newMap.set(key, { name: obj.name, checks: obj.checks.map(() => 0) })
    })
  }

  const handleChangeSums = (e) => {
    setValue(e.target.value)
    setError(!validateRegexp(e.target.value, itemsRegexp))
  }

  const items = parseItems(value)

  const createForm = (e) => {
    e.preventDefault()
    const keys = parseUsers(user)
    setSums(items)
    setUserChecks(() => {
      const map = new Map()
      keys.forEach((item) => {
        map.set(Symbol(item), { name: item, checks: items.map(() => 0) })
      })
      return map
    })
  }

  const formChecks = () => {
    const res = []
    users.forEach((item, elemKey) => {
      const component = (
        <div className={classes.userScore}>
          <Typography variant="overline" display="block" gutterBottom={false}>
            <Button color="primary" onClick={() => handleColClick(elemKey)}>{item.name}</Button>
          </Typography>
          {
            item.checks
              .map((check, j) => (
                <Checkbox
                  key={`${elemKey.toString()}-${j}`}
                  name={j}
                  symbol={elemKey}
                  checked={Boolean(check)}
                  onChange={() => handleClick(elemKey, j)}
                />
              ))
          }
          <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
            <b>
              {
                item.checks.reduce((sum, flag, i) => (
                  categoryDividers[i]
                    ? sum
                      + flag * sums[i].quantity
                      * sums[i].price * (1 - sums[i].discount) / categoryDividers[i]
                    : sum
                ), 0).toFixed(2)
              }
            </b>
          </Typography>
        </div>
      )
      res.push(component)
    })
    return res
  }

  // определяем что какой то товар никто не поделил между собой
  categoryDividers = items
    .map((su, i) => {
      let arr = 0
      users
        .forEach((item, symbol, map) => {
          arr += map.get(symbol).checks[i]
        })
      return arr
    })

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6}>
        <Card className={classes.formInitial}>
          <CardContent>
            <form noValidate onSubmit={createForm}>
              <Typography
                variant="h5"
                display="block"
              >
                Set initial data for your popoyka
              </Typography>
              <TextField
                id="users"
                label="Enter participants"
                fullWidth
                value={user}
                onChange={e => setUsers(e.target.value)}
                margin="normal"
                helperText="Input format: user1,user2,...,userN"
              />
              <TextField
                error={itemsError}
                multiline
                id="items"
                label="Enter items"
                fullWidth
                value={value}
                onChange={handleChangeSums}
                margin="normal"
                helperText="Input format: itemName1,itemPrice1[,itemQuantity1,itemDiscount1];..."
              />
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Create form
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card className={classes.formInitial}>
          <CardContent>
            <Typography
              variant="h5"
              display="block"
            >
              Settings for form
            </Typography>

            <form>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={isVisibleDiscount}
                    onChange={changeVisibilityDiscount}
                    color="primary"
                  />
                )}
                label="DISCOUNT"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={isVisibleQuantity}
                    onChange={changeVisibilityQuantity}
                    color="primary"
                  />
                )}
                label="QUANTITY"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={isVisibleEqually}
                    onChange={changeVisibilityEqually}
                    color="primary"
                  />
                )}
                label="EQUALLY"
              />
            </form>
          </CardContent>
        </Card>
      </Grid>

      {
        (_.isEmpty(sums) || users.size === 0)
          ? null
          : (
            <Grid item xs={12}>
              <div className={classes.form}>
                <div className={classes.categoryList}>
                  <div className={classes.caterory}>
                    {
                      sums.map(item => (
                        <Typography
                          key={item.name}
                          classes={{ overline: classes.overline }}
                          variant="overline"
                          display="block"
                          gutterBottom={false}
                        >
                          {item.name}
                        </Typography>
                      ))
                    }
                    <Typography
                      classes={{ overline: classes.overline }}
                      variant="overline"
                      display="block"
                      gutterBottom={false}
                    >
                      <b>Total</b>
                    </Typography>
                  </div>
                </div>

                <div className={classes.columns}>
                  {isVisibleQuantity && (
                    <div className={classes.sums}>
                      <Typography className={classes.header} variant="overline" display="block" gutterBottom={false}>
                        Quantity
                      </Typography>

                      {
                        sums.map((item, i) => (
                          <Typography key={`qt-${item.quantity}`} classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
                            {categoryDividers[i] ? item.quantity : <i>{item.quantity}</i>}
                          </Typography>
                        ))
                      }
                    </div>
                  )}
                  <div className={classes.sums}>
                    <Typography className={classes.header} variant="overline" display="block" gutterBottom={false}>
                      Price
                    </Typography>

                    {
                      sums.map((item, i) => (
                        <Typography
                          key={`pr-${item.price}-${item.quantity}`}
                          classes={{ overline: classes.overline }}
                          variant="overline"
                          display="block"
                          gutterBottom={false}
                        >
                          {
                            categoryDividers[i]
                              ? item.price * item.quantity
                              : <i>{item.price * item.quantity}</i>
                          }
                        </Typography>
                      ))
                    }
                    <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
                      <b>
                        {
                          sums
                            .reduce((sum, item, i) => (categoryDividers[i]
                              ? sum + item.price * item.quantity
                              : sum), 0)
                            .toFixed(2)
                        }
                      </b>
                    </Typography>
                  </div>
                  {isVisibleDiscount && (
                    <div className={classes.sums}>
                      <Typography className={classes.header} variant="overline" display="block" gutterBottom={false}>
                        Discount
                      </Typography>

                      {
                        sums.map((item, i) => (
                          <Typography key={`dc-${item.price}-${item.quantity}`} classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
                            {
                              categoryDividers[i]
                                ? (item.price - item.price * item.discount) * item.quantity
                                : <i>{(item.price - item.price * item.discount) * item.quantity}</i>}
                          </Typography>
                        ))
                      }
                      <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
                        <b>
                          {
                            sums
                              .reduce((sum, item, i) => (
                                categoryDividers[i]
                                  ? sum + item.quantity * (item.price - item.price * item.discount)
                                  : sum
                              ), 0)
                              .toFixed(2)
                          }
                        </b>
                      </Typography>
                    </div>
                  )}
                </div>
                <div className={classes.users}>
                  {
                    formChecks()
                  }
                </div>
              </div>
            </Grid>
          )
      }
    </Grid>
  )
}
