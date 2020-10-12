import React, { useState } from 'react'
import {
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import _ from 'lodash'
import { Formik, FieldArray, Form, Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import { validateRegexp } from '../../utils'
import { parseItems, parseUsers, itemsRegexp } from './utils'
import { useBillFormStyles } from './styles'


export const ShareBill = () => {
  const [value, setValue] = useState('')
  const [user, setUsers] = useState('')
  const [sums, setSums] = useState([])
  const [users, setUserChecks] = useState([])
  const [itemsError, setError] = useState(false)
  const [isVisibleDiscount, changeVisibilityDiscount] = useState(false)
  const [isVisibleQuantity, changeVisibilityQuantity] = useState(false)
  const [isVisibleEqually, changeVisibilityEqually] = useState(false)
  const [newAlkash, setNewAlkash] = useState('')
  const [newItem, setNewItem] = useState('')
  const [step, setStep] = useState(0)
  const classes = useBillFormStyles()
  let categoryDividers

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
      const res = []
      keys.forEach((item) => {
        res.push({ name: item, checks: items.map(() => 0) })
      })
      return res
    })
    setStep(1)
  }

  // короче супир идея:
  // wizard form, первый шаг - задать входные параметры для формы
  // второй шаг - построить форму с FieldsArray (v)
  // редактировать форму (добавлять/удалять алкашей, позиции) - (v)
  //  сначала сохраняем в localstorage конфиг текущей формы (?)
  // заменить лейблы на инпуты - даем возможность редактировать название, цену и проч
  // все это добавить в values
  return (
    <div>
      <Stepper activeStep={step} alternativeLabel>
        <Step>
          <StepLabel>Create Form</StepLabel>
        </Step>
        <Step>
          <StepLabel>Calculate Bill</StepLabel>
        </Step>
      </Stepper>
      {step === 0 && (
        <Grid container className={classes.root}>
          <Grid item xs={12} md={12}>
            <form noValidate onSubmit={createForm} className={classes.formInitial}>
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
                disabled={!user || itemsError || !value}
              >
                Create form
              </Button>
            </form>
          </Grid>
        </Grid>
      )}
      {step === 1 && (
        <Grid container className={classes.root}>
          {
            (_.isEmpty(sums) || users.length === 0)
              ? null
              : (
                <Formik
                  initialValues={{ users, sums }}
                  onSubmit={(values) => { console.log(values) }}
                >
                  {
                    ({ values, setFieldValue }) => {
                      // по клику на колоннку заполняем/снимаем все галки в столбце
                      const handleColClick = (index) => {
                        if (values.users[index].checks.some(item => item === 0)) {
                          values.users[index].checks.forEach((value, i) => setFieldValue(`users[${index}].checks[${i}]`, 1, false))
                          return
                        }
                        values.users[index].checks.forEach((value, i) => setFieldValue(`users[${index}].checks[${i}]`, 0, false))
                      }

                      // определяем что какой то товар никто не поделил между собой
                      categoryDividers = values.sums
                        .map((su, i) => {
                          let arr = 0
                          values.users
                            .forEach(item => {
                              arr += item.checks[i]
                            })
                          return arr
                        })

                      return (
                        <>
                          <form className={classes.formInitial}>
                            <Button
                              disabled={step === 0}
                              onClick={() => setStep(0)}
                              className={classes.backButton}
                            >
                              Back
                              </Button>
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  checked={isVisibleDiscount}
                                  onChange={e => changeVisibilityDiscount(e.target.checked)}
                                  color="primary"
                                />
                              )}
                              label="DISCOUNT"
                            />
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  checked={isVisibleQuantity}
                                  onChange={(e) => changeVisibilityQuantity(e.target.checked)}
                                  color="primary"
                                />
                              )}
                              label="QUANTITY"
                            />
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  checked={isVisibleEqually}
                                  onChange={(e) => changeVisibilityEqually(e.target.checked)}
                                  color="primary"
                                />
                              )}
                              label="EQUALLY"
                            />
                          </form>
                          <Form>
                            <div className={classes.form}>
                              <div className={classes.categoryList}>
                                <FieldArray
                                  name="sums"
                                  render={({ push }) => {
                                    // добавляем позицию в счет
                                    const addStuff = () => {
                                      const item = parseItems(newItem)
                                      push(...item)
                                      values.users.forEach(item => {
                                        item.checks.push(0)
                                      })
                                    }

                                    return (
                                      <div>
                                        <div className={classes.headRow}>
                                          <Typography className={classNames(classes.header, classes.short)} variant="overline" display="block" gutterBottom={false}>
                                            Quantity
                                          </Typography>
                                          <Typography className={classNames(classes.header, classes.price)} variant="overline" display="block" gutterBottom={false}>
                                            Price
                                          </Typography>
                                          <Typography className={classNames(classes.header, classes.short)} variant="overline" display="block" gutterBottom={false}>
                                            Discount
                                          </Typography>
                                        </div>

                                        {
                                          values.sums.length > 0 && values.sums.map((item, i) => (
                                            <div className={classes.row} key={i}>
                                              <Field
                                                name={`sums[${i}].name`}
                                              >
                                                {({ field }) => (
                                                  <TextField {...field} className={classes.caterory} />
                                                )}
                                              </Field>
                                              <Field
                                                name={`sums[${i}].quantity`}
                                              >
                                                {({ field }) => (
                                                  <TextField
                                                    {...field}
                                                    className={classes.short}
                                                  />
                                                )}
                                              </Field>
                                              <Field
                                                name={`sums[${i}].price`}
                                              >
                                                {({ field }) => (
                                                  <TextField {...field} className={classes.price} />
                                                )}
                                              </Field>
                                              <Field
                                                name={`sums[${i}].discount`}
                                              >
                                                {({ field }) => (
                                                  <TextField
                                                    {...field}
                                                    className={classes.short}
                                                  />
                                                )}
                                              </Field>

                                            </div>
                                          ))
                                        }
                                        <div className={classes.totalRow}>
                                          <Typography
                                            className={classNames(classes.total, classes.caterory)}
                                            variant="overline"
                                            display="block"
                                            gutterBottom={false}
                                          >
                                            <b>Total</b>
                                          </Typography>
                                          <div className={classes.totalRight}>
                                            <Typography className={classNames(classes.total, classes.price)} variant="overline" display="block" gutterBottom={false}>
                                              <b>
                                                {
                                                  values.sums
                                                    .reduce((sum, item, i) => (categoryDividers[i]
                                                      ? sum + item.price * item.quantity
                                                      : sum), 0)
                                                    .toFixed(2)
                                                }
                                              </b>
                                            </Typography>
                                            <Typography className={classNames(classes.total, classes.short)} variant="overline" display="block" gutterBottom={false}>
                                              <b>
                                                {
                                                  values.sums
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
                                        <TextField value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                                        <Button disabled={!newItem} onClick={addStuff}>Add stuff</Button>
                                      </div>
                                    )
                                  }}
                                />
                              </div>
                              <FieldArray
                                name="users"
                                render={({ push, remove }) => {
                                  const addUser = () => {
                                    push({ name: newAlkash, checks: new Array(values.sums.length).fill(0) })
                                    setNewAlkash('')
                                  }
                                  return (
                                    <div className={classes.userScore}>
                                      {
                                        values.users.length > 0 && (
                                          values.users.map((user, index) => (
                                            <div key={`${user.name}-${index}`}>
                                              <Typography variant="overline" className={classes.users} gutterBottom={false}>
                                                <Button size="small" color="primary" onClick={() => handleColClick(index)}>{user.name}</Button>
                                                <IconButton aria-label="delete" onClick={() => remove(index)} className={classes.deleteBtn}>
                                                  <FontAwesomeIcon size="xs" icon={faTimesCircle} />
                                                </IconButton>
                                              </Typography>
                                              <FieldArray
                                                name="checks"
                                                render={() => (
                                                  <div>
                                                    {values.users[index].checks.length > 0 && (
                                                      values.users[index].checks.map((check, i) => (
                                                        <div key={`users.${index}.checks.${i}`}>
                                                          <Field
                                                            name={`users[${index}].checks[${i}]`}
                                                            value={`users[${index}].checks[${i}]`}
                                                          >
                                                            {({ field }) => (
                                                              <Checkbox
                                                                {...field}
                                                                checked={Boolean(field.value)}
                                                                onChange={e => setFieldValue(`users[${index}].checks[${i}]`, Number(e.target.checked), false)}
                                                              />
                                                            )}
                                                          </Field>
                                                        </div>
                                                      ))
                                                    )}
                                                    <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
                                                      <b>
                                                        {
                                                          values.users[index].checks.reduce((sum, flag, i) => (
                                                            categoryDividers[i]
                                                              ? sum
                                                              + flag * values.sums[i].quantity
                                                              * values.sums[i].price * (1 - values.sums[i].discount) / categoryDividers[i]
                                                              : sum
                                                          ), 0).toFixed(2)
                                                        }
                                                      </b>
                                                    </Typography>
                                                  </div>
                                                )}
                                              />
                                            </div>
                                          ))
                                        )
                                      }
                                      <div>
                                        <TextField value={newAlkash} onChange={e => setNewAlkash(e.target.value)} />
                                        <Button
                                          onClick={addUser}
                                          disabled={!newAlkash}
                                        >
                                          Add Friend
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                }}
                              />
                            </div>
                          </Form>
                        </>
                      )
                    }
                  }
                </Formik>
              )
          }
        </Grid>
      )
      }
    </div>
  )

}
