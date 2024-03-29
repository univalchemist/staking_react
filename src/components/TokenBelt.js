/* eslint-disable */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { getLaceTokenInfo } from '../services/token.service';
import { Tiny } from './Typography';
import Dot from './Dot';
import * as Utils from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    width: '100%',
    backgroundColor: theme.palette.surface[2],
  },
  wrapper: {
    height: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    paddingLeft: theme.spacing(3),
    animationPlayState: 'paused',
  },
  animation: {
    animationPlayState: 'running',
    animationName: '$flow',
    animationDuration: '30s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    '& h6': {
      whiteSpace: 'nowrap',
    },
  },
  '@keyframes flow': {
    from: {
      marginLeft: '90%',
    },
    to: {
      marginLeft: '-120%',
    },
  },
}));

const TokenInfo = () => {
  const classes = useStyles();
  const [tokenInfo, setTokenInfo] = useState(null);

  useEffect(() => {
    getLaceTokenInfo('lace')
      .then((result) => setTokenInfo(result));
  }, []);
  return (
    <div className={classes.root}>
      <div className={clsx(classes.wrapper, classes.animation)}>
        {tokenInfo && (
          <>
            <div className={classes.item}>
              <Tiny color="textSecondary">Price:</Tiny>
              &nbsp;
              <Tiny color="textSecondary">{Utils.formatNumberWithCommas(tokenInfo.price || 0)}</Tiny>
            </div>

            <Dot />

            <div className={classes.item}>
              <Tiny color="textSecondary">Market cap:</Tiny>
              &nbsp;
              <Tiny color="textSecondary">{Utils.formatNumberWithCommas(tokenInfo.marketCap || 0)}</Tiny>
            </div>

            <Dot />

            <div className={classes.item}>
              <Tiny color="textSecondary">Self Reported Circulating Supply:</Tiny>
              &nbsp;
              <Tiny color="textSecondary">{Utils.formatNumberWithCommas(tokenInfo.circulatingSupply || 0)}</Tiny>
            </div>

            <Dot />

            <div className={classes.item}>
              <Tiny color="textSecondary">Max Supply: </Tiny>
              &nbsp;
              <Tiny color="textSecondary">{Utils.formatNumberWithCommas(tokenInfo.maxSupply || 0)}</Tiny>
            </div>

            <Dot />

            <div className={classes.item}>
              <Tiny color="textSecondary">Total Supply:</Tiny>
              &nbsp;
              <Tiny color="textSecondary">{Utils.formatNumberWithCommas(tokenInfo.totalSupply || 0)}</Tiny>
            </div>

            <Dot />
          </>
        )}
      </div>
    </div>
  );
};

export default TokenInfo;
