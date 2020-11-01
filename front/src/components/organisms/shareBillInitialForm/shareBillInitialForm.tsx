import React, { FC, useState } from 'react'
import { Typography, TextField, MenuItem, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { validateRegexp } from '../../../utils'
import { itemsRegexp, parseUsers, parseItems, ItemInterface } from '../../../routers/shareBill/utils'

interface Props {
    setForm: (items: ItemInterface[], keys: string[]) => void;
}

/**
 * A component for initial state setting for ShareBill form
 */
export const ShareBillInitialForm: FC<Props> = ({ setForm }) => {
    const classes = useStyles()
    const [partyName, setPartyName] = useState('')
    const [user, setUsers] = useState('')
    const [value, setValue] = useState('')
    const [itemsError, setError] = useState(false)

    const initialValues = JSON.parse(localStorage.getItem('lastParty') || '[]')

    const setFromInitialData = (e: any) => {
        setPartyName(e.target.value.partyName)
        setUsers(e.target.value.user)
        setValue(e.target.value.value)
    }

    const handleChangeSums = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setError(Boolean(e.target.value.length) && !validateRegexp(e.target.value, itemsRegexp))
    }

    const handleSubmit = () => {
        const keys = parseUsers(user)
        const items = parseItems(value)
        // TODO update LS by partyName
        localStorage.setItem('lastParty', JSON.stringify([ ...initialValues, { partyName, user, value }]))
        setForm(items, keys)
    }

    return (
        <div className={classes.root}>
            <form noValidate onSubmit={handleSubmit} className={classes.formInitial}>
              <Typography
                variant="h5"
                display="block"
              >
                Set initial data for your popoyka
              </Typography>
              {/* TODO join in one text field with select */}
              {!!initialValues.length && (
                <TextField
                id="partySaved"
                select
                value={partyName}
                label="You have saved parties"
                onChange={setFromInitialData}
                fullWidth
              >
                {initialValues.map((item: any, i: number) => <MenuItem key={`${item.partyName}-${i}`} value={item}>{item.partyName}</MenuItem>)}
              </TextField>
              )}
              <TextField
                id="partyName"
                label="Party name"
                value={partyName}
                onChange={e => setPartyName(e.target.value)}
                fullWidth
              />
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
                disabled={!user || itemsError || !partyName}
              >
                Create form
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
              >
                Skip
              </Button>
            </form>
        </div>
    )
}