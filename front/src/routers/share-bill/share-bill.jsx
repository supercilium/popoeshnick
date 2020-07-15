/* eslint-disable quote-props */
import React, { useState } from 'react'
import {
  Checkbox,
  makeStyles,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    margin: '100px',
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
    marginTop: '31px',
  },
  caterory: {
    padding: '0 42px',
  },
  sums: {
    padding: '0 42px',
  },
  overline: {
    lineHeight: '42px',
  },
}))

const initialChecks = {
  'Me': [0, 0, 1, 0, 0, 1],
  'Ale': [1, 0, 1, 0, 1, 1],
  'Kirill': [1, 0, 1, 0, 0, 1],
  'Nick': [0, 1, 1, 1, 0, 1],
}

export default () => {
  const [sumList, setSum] = useState([123.2, 400, 1200, 125, 400, 1290.20])
  const [categoryList, setcategory] = useState(['French fri', 'Garlic toasts', 'Ale', 'Cheese souсe', 'Cheese', 'Beer'])
  const [users, setUserChecks] = useState(initialChecks)
  const classes = useStyles()

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
        return Object.assign({}, prevUsers, { [name]: arr.map(item => 1) })
      }
      return Object.assign({}, prevUsers, { [name]: arr.map(item => 0) })
    })
  }

  const categoryDividers = categoryList.map((item, i) => Object.keys(users).reduce((acc, user) => users[user][i] + acc, 0))

  return (
    <div className={classes.form}>
      <div className={classes.categoryList}>
        <div className={classes.caterory}>
          {categoryList.map(item => (
            <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
              {item}
            </Typography>
          ))}
          <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
            <b>Total</b>
          </Typography>
        </div>
        <div className={classes.sums}>
          {sumList.map((item, i) => (
            <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
              {categoryDividers[i] ? item : <i>{item}</i>}
            </Typography>
          ))}
          <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
            <b>{sumList.reduce((sum, item, i) => { return categoryDividers[i] ? sum + item : sum }, 0).toFixed(2)}</b>
          </Typography>
        </div>
      </div>

      <div className={classes.users}>
        {
          Object.keys(users).map(item => (
            <div className={classes.userScore}>
              <Typography variant="overline" display="block" gutterBottom={false}>
                <div onClick={handleColClick}>{item}</div>
              </Typography>
              {users[item].map((check, j) => <Checkbox name={`${item}-${j}`} checked={Boolean(check)} onChange={handleClick} />)}
              <Typography classes={{ overline: classes.overline }} variant="overline" display="block" gutterBottom={false}>
                <b>{users[item].reduce((sum, flag, i) => { return categoryDividers[i] ? sum + flag * sumList[i] / categoryDividers[i] : sum }, 0).toFixed(2)}</b>
              </Typography>
            </div>
          ))
        }
      </div>
    </div>
  )
}
