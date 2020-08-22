/* eslint-disable quote-props */
import React, { useState } from 'react'
import {
  Checkbox,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import _ from 'lodash'

const useStyles = makeStyles({
  root: {
    paddingBottom: '50px',
  },
  formInitial: {
    maxWidth: '500px',
    margin: '42px',
  },
  button: {
    margin: '20px 0 0',
  },
  columns: {
    display: 'flex',
  },
  header: {
    padding: '4px 0 1px',
  },
  form: {
    display: 'flex',
    margin: '0 auto',
  },
  userScore: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    margin: '0 12px',
  },
  users: {
    display: 'flex',
  },
  categoryList: {
    display: 'flex',
    marginTop: '36px',
  },
  caterory: {
    padding: '0 42px',
  },
  sums: {
    padding: '0 10px',
  },
  overline: {
    lineHeight: '42px',
  },
})

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

const parseUsers = str => str.split(',')

export default () => {
  const [value, setValue] = useState('')
  const [user, setUsers] = useState('')
  const [sums, setSums] = useState([])
  const [users, setUserChecks] = useState({})
  const classes = useStyles()
  let categoryDividers = []

  const handleClick = (event) => {
    const [name, index] = event.target.name.split('-')
    setUserChecks((prevUsers) => {
      const arr = prevUsers[name]
      arr[index] = Number(!arr[index])
      return Object.assign({}, prevUsers, { [name]: arr })
    })
  }

  const handleColClick = (event) => {
    const name = event.target.innerHTML
    setUserChecks((prevUsers) => {
      const arr = prevUsers[name]
      if (arr.reduce((sum, item) => sum + item, 0) < arr.length) {
        return Object.assign({}, prevUsers, { [name]: arr.map(() => 1) })
      }
      return Object.assign({}, prevUsers, { [name]: arr.map(() => 0) })
    })
  }

  const items = parseItems(value)

  const createForm = (e) => {
    e.preventDefault()
    const keys = parseUsers(user)
    setSums(items)
    setUserChecks(Object.assign({}, ...keys.map(name => ({ [name]: items.map(() => 0) }))))
  }

  // определяем что какой то товар никто не поделил между собой
  categoryDividers = items
    .map((su, i) => Object.keys(users).reduce((acc, j) => Number(users[j][i]) + acc, 0))

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
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
                multiline
                id="items"
                label="Enter items"
                fullWidth
                value={value}
                onChange={e => setValue(e.target.value)}
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

      {
        (_.isEmpty(sums) || _.isEmpty(users))
          ? null
          : (
            <Grid item xs={12}>
              <div className={classes.form}>
                <div className={classes.categoryList}>
                  <div className={classes.caterory}>
                    {
                      sums.map(item => (
                        <Typography
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
                  <div className={classes.sums}>
                    <Typography className={classes.header} variant="overline" display="block" gutterBottom={false}>
                      Quantity
                    </Typography>

                    {
                      sums.map((item, i) => (
                        <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
                          {categoryDividers[i] ? item.quantity : <i>{item.quantity}</i>}
                        </Typography>
                      ))
                    }
                  </div>
                  <div className={classes.sums}>
                    <Typography className={classes.header} variant="overline" display="block" gutterBottom={false}>
                      Price
                    </Typography>

                    {
                      sums.map((item, i) => (
                        <Typography
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
                  <div className={classes.sums}>
                    <Typography className={classes.header} variant="overline" display="block" gutterBottom={false}>
                      Discount
                    </Typography>

                    {
                      sums.map((item, i) => (
                        <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
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
                </div>
                <div className={classes.users}>
                  {
                    Object.keys(users).map(item => (
                      <div className={classes.userScore}>
                        <Typography variant="overline" display="block" gutterBottom={false}>
                          <Button color="primary" onClick={handleColClick}>{item}</Button>
                        </Typography>
                        {users[item].map((check, j) => <Checkbox name={`${item}-${j}`} checked={Boolean(check)} onChange={handleClick} />)}
                        <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
                          <b>
                            {
                              users[item].reduce((sum, flag, i) => (
                                categoryDividers[i]
                                  ? sum + flag * sums[i].quantity * sums[i].price * (1 - sums[i].discount) / categoryDividers[i]
                                  : sum
                              ), 0).toFixed(2)
                            }
                          </b>
                        </Typography>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Grid>
          )
      }
    </Grid>
  )
}
