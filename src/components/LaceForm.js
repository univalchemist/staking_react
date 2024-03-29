import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import clsx from 'clsx';
import { Body, TinyBold } from './Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.surface[2]}`,
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.surface[0],
    padding: theme.spacing(1, 2),
    '&:hover': {
      borderColor: theme.palette.surface[3],
    },
  },
  error: {
    borderColor: `${theme.palette.error.main} !important`,
  },
  message: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
    fontSize: theme.spacing(1.5),
    color: theme.palette.error.main,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const LaceForm = ({
  resetInput,
  disabled,
  currency,
  maxValue,
  setError,
  error,
  onChangeValue,
  value,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (resetInput) {
      onChangeValue(0);
    }
  }, [resetInput]);

  const onSetValue = () => {
    onChangeValue(Number(maxValue).toFixed(2));
  };

  const handleChange = (_val) => {
    let val = _val.replace(/^00+/, '0');
    if (val.match(/^0+/) && val.match(/^-?\d+$/) && val !== '0') {
      val = val.substring(0, 0) + val.substring(0 + 1);
    }
    if (val.match(/^\d+\.\d+$/) && val.split('.')[1].length > 2) {
      val = Number(val).toFixed(2).toString();
    }
    onChangeValue(val);
    if (Number(val) > Number(maxValue)) {
      setError('Insufficient funds');
    } else {
      setError('');
    }
  };

  return (
    <>
      <div className={clsx(classes.root, Boolean(error) && classes.error)}>
        <div className={classes.row}>
          <Body color="textSecondary">Amount</Body>
          <Body color="textSecondary" onClick={onSetValue}>Max</Body>
        </div>
        <div className={classes.row}>
          <InputBase
            type="number"
            disabled={disabled}
            placeholder="0"
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            onMouseLeave={() => value || onChangeValue('0')}
            onClick={() => (value === '0' ? onChangeValue('') : value)}
          />
          <TinyBold>{currency}</TinyBold>
        </div>
      </div>
      {Boolean(error) && (
        <div className={classes.message}>
          {error}
        </div>
      )}
    </>
  );
};

export default LaceForm;
