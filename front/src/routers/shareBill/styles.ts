import { makeStyles } from '@material-ui/core/styles'

export const useBillFormStyles = makeStyles({
  root: {
    paddingBottom: '50px',
    width: 'auto',
    overflow: 'auto',
    maxWidth: 'none',
  },
  formInitial: {
    maxWidth: '500px',
    margin: '42px auto',
  },
  button: {
    margin: '20px auto 0',
    display: 'block',
  },
  columns: {
    display: 'flex',
  },
  header: {
    fontSize: '10px',
    lineHeight: '30px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    margin: '0 auto',
    padding: '24px'
  },
  userScore: {
    display: 'flex',
    textAlign: 'center',
    margin: '0',

    '& > div': {
      margin: '0 12px'
    }
  },
  users: {
    display: 'flex',
  },
  categoryList: {
    display: 'flex',
    minWidth: '400px',

    '& .MuiTextField-root': {
      padding: '5px 0',
    },
  },
  caterory: {
    margin: '0 12px 0 0',
    maxWidth: '180px',
  },
  short: {
    margin: '0 12px 0 0',
    width: '50px',
  },
  price: {
    margin: '0 12px 0 0',
    width: '70px',
  },
  sums: {
    padding: '0 10px',
  },
  overline: {
    lineHeight: '42px',
    whiteSpace: 'nowrap',
    maxWidth: '110px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  deleteBtn: {
    padding: 0,
    fontSize: '18px',

    '&:hover': {
      background: 'none',
    },
  },
  headRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  row: {
    display: 'flex',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '42px',
  },
  totalRight: {
    display: 'flex',
  },
})
