import React, { useState } from 'react'
import {
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import _ from 'lodash'
import { Formik, FieldArray, Form, Field, FastField, FieldProps } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import { parseItem, ItemInterface } from './utils'
import { useBillFormStyles } from './styles'
import { ShareBillInitialForm } from '../../components/organisms'


export const ShareBill = () => {
  const [sums, setSums] = useState<any[]>([])
  const [users, setUserChecks] = useState<any[]>([])
  const [isVisibleDiscount, changeVisibilityDiscount] = useState(false)
  const [isVisibleQuantity, changeVisibilityQuantity] = useState(false)
  const [isVisibleEqually, changeVisibilityEqually] = useState(false)
  const [newAlkash, setNewAlkash] = useState('')
  const [newItem, setNewItem] = useState('')
  const [step, setStep] = useState(0)
  const classes = useBillFormStyles()
  let categoryDividers: number[]


  const createForm = (items: ItemInterface[], keys: string[]) => {
    // e.preventDefault()
    setSums(items)
    setUserChecks(() => {
      const res: any[] = []
      keys.forEach((item: string) => {
        res.push({ name: item, checks: items.map(() => 0) })
      })
      return res
    })
    setStep(1)
  }

  // короче супир идея:
  // wizard form, первый шаг - задать входные параметры для формы (v)
  // второй шаг - построить форму с FieldsArray (v)
  // редактировать форму (добавлять/удалять алкашей, позиции) - (v)
  //  сначала сохраняем в localstorage конфиг текущей формы (v)
  // добавить колонку с переключением на дележку количеством
  // заменить лейблы на инпуты - даем возможность редактировать название, цену и проч (v)
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
      {step === 0 && <ShareBillInitialForm setForm={createForm} />}
      {step === 1 && (
        <div className={classes.root}>
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
                      // по клику на колонку заполняем/снимаем все галки в столбце
                      const handleColClick = (index: number) => {
                        if (values.users[index].checks.some((item: number) => item === 0)) {
                          values.users[index].checks.forEach((value: any, i: number) => setFieldValue(`users[${index}].checks[${i}]`, 1, false))
                          return
                        }
                        values.users[index].checks.forEach((value: any, i: number) => setFieldValue(`users[${index}].checks[${i}]`, 0, false))
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
                              disabled={Number(step) === 0}
                              onClick={() => setStep(0)}
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
                          <Form className={classes.form}>
                              <div className={classes.categoryList}>
                                <FieldArray
                                  name="sums"
                                  render={({ push }) => {
                                    // добавляем позицию в счет
                                    const addStuff = () => {
                                      const item = parseItem(newItem)
                                      push(item)
                                      values.users.forEach(item => {
                                        item.checks.push(0)
                                      })
                                    }

                                    return (
                                      <div>
                                        <div className={classes.headRow}>
                                          <Typography className={classNames(classes.header, classes.short, {[classes.hidden]: !isVisibleQuantity})} variant="overline" display="block" gutterBottom={false}>
                                            Quantity
                                          </Typography>
                                          <Typography className={classNames(classes.header, classes.price)} variant="overline" display="block" gutterBottom={false}>
                                            Price
                                          </Typography>
                                          <Typography className={classNames(classes.header, classes.short, {[classes.hidden]: !isVisibleDiscount})} variant="overline" display="block" gutterBottom={false}>
                                            Discount
                                          </Typography>
                                        </div>

                                        {
                                          values.sums.length > 0 && values.sums.map((item, i) => (
                                            <div className={classes.row} key={i}>
                                              <FastField
                                                name={`sums[${i}].name`}
                                              >
                                                {({ field }: FieldProps) => (
                                                  <TextField {...field} className={classes.caterory} />
                                                )}
                                              </FastField>
                                              <div className={classNames({[classes.hidden]: !isVisibleQuantity})}>
                                                <Field
                                                  name={`sums[${i}].quantity`}
                                                >
                                                  {({ field }: FieldProps) => (
                                                    <TextField
                                                      {...field}
                                                      className={classes.short}
                                                    />
                                                  )}
                                                </Field>
                                              </div>
                                              <Field
                                                name={`sums[${i}].price`}
                                              >
                                                {({ field }: FieldProps) => (
                                                  <TextField {...field} className={classes.price} />
                                                )}
                                              </Field>
                                              <div className={classNames({[classes.hidden]: !isVisibleDiscount})}>
                                                <Field
                                                  name={`sums[${i}].discount`}
                                                >
                                                  {({ field }: FieldProps) => (
                                                    <TextField
                                                      {...field}
                                                      className={classes.short}
                                                    />
                                                  )}
                                                </Field>
                                              </div>

                                            </div>
                                          ))
                                        }
                                        <div className={classes.totalRow}>
                                          <Typography
                                            className={classes.caterory}
                                            variant="overline"
                                            display="block"
                                            gutterBottom={false}
                                          >
                                            <b>Total</b>
                                          </Typography>
                                          <div className={classes.totalRight}>
                                            <Typography className={classes.price} variant="overline" display="block" gutterBottom={false}>
                                              <b>
                                                {
                                                  values.sums
                                                    .reduce((sum, item: any, i) => (categoryDividers[i]
                                                      ? sum + item.price * item.quantity
                                                      : sum), 0)
                                                    .toFixed(2)
                                                }
                                              </b>
                                            </Typography>
                                            <Typography className={classNames(classes.short, {[classes.hidden]: !isVisibleDiscount})} variant="overline" display="block" gutterBottom={false}>
                                              <b>
                                                {
                                                  values.sums
                                                    .reduce((sum, item: any, i) => (
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
                                        {/* TODO add validation */}
                                        {/* move arrow func outside */}
                                        <div className={classes.addButton}>
                                          <TextField value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={e => e.keyCode === 13 && addStuff()} />
                                          {/* TODO we can add when newItem empty or valid */}
                                          <Button disabled={!newItem} onClick={addStuff}>Add stuff</Button>
                                        </div>
                                      </div>
                                    )
                                  }}
                                />
                              </div>
                              <FieldArray
                                name="users"
                                render={({ push, remove }) => {
                                  const addUser = () => {
                                    push({ name: newAlkash || 'Buddy', checks: new Array(values.sums.length).fill(0) })
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
                                                      values.users[index].checks.map((check: any, i: number) => (
                                                        <div key={`users.${index}.checks.${i}`}>
                                                          <Field
                                                            name={`users[${index}].checks[${i}]`}
                                                            value={`users[${index}].checks[${i}]`}
                                                          >
                                                            {({ field }: FieldProps) => (
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
                                                          values.users[index].checks.reduce((sum: number, flag: number, i: number) => (
                                                            categoryDividers[i]
                                                              ? sum
                                                              + flag * (values.sums[i] as any).quantity
                                                              * (values.sums[i] as any).price * (1 - (values.sums[i] as any).discount) / categoryDividers[i]
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
                                      <div className={classes.addButton}>
                                        <TextField value={newAlkash} onChange={e => setNewAlkash(e.target.value)} onKeyDown={(e) => e.keyCode === 13 && newAlkash && addUser()} />
                                        <Button
                                          onClick={addUser}
                                        >
                                          Add Friend
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                }}
                              />
                          </Form>
                        </>
                      )
                    }
                  }
                </Formik>
              )
          }
        </div>
      )
      }
    </div>
  )

}
