import * as React from 'react';
import PropTypes from 'prop-types';

// context
import { usePlayer, useConnection } from '../../context/';

// hooks
import { useCountdown } from '../../common/hooks/'

// material
import MuiBox from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

// styles
import { styled } from '../../common/styles/'

// blocks
import Progress from './Progress'


const LogoDiv = styled.div(theme => ({
  paddingBottom: theme.spacing(4),
  '& > img': {
    maxWidth: 100,
  },
}))

const RootBox = styled.custom(MuiBox, theme => ({

  '@keyframes preloader-opacity': {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    }
  },

  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  height: 'var(--window-height)',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  backgroundColor: 'rgba(0,0,0,1)',

  '&[data-loaded="true"]': {
    pointerEvents: 'none',
    animationName: 'preloader-opacity',
    animationDuration: '2.5s',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'forwards',
  },

}))

const ProgressBox = styled.custom(MuiBox, theme => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',

  paddingBottom: '15vh',

  '& > [data-progress]': {
    width: '20vw',
  },
  '& > [data-helpertext]': {
    fontSize: 11,
    textTransform: 'uppercase',
    marginTop: theme.spacing(3),
    letterSpacing: '.3em',
  },

}))

const ButtonStopped = styled.custom(IconButton, theme => ({
  position: 'relative',
  '& > .material-icons': {
    fontSize: '5rem',
  },
}))

const VideoCover = styled.div(theme => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  backgroundColor: 'rgba(0,0,0, 1)',
  '& > video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: .4,

    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
  },

}))

function Preloader({ logoUrl, videoUrl }) {
  const player = usePlayer()
  const connection = useConnection()

  const secondsToStart = connection.state.seconds_to_start

  const countdown = useCountdown({ seconds: secondsToStart })

  React.useEffect(() => {

    if (player.state.loaded) {
      countdown.stop()
    } else {
      countdown.start()
    }

  }, [player.state.loaded])



  const renderInner = () => {

    if (player.state.connected && player.state.loaded) {
      return (<div />);
    }

    const renderPreloader = () => {

      if (!player.state.loaded && player.state.stream_stopped) {
        return (
          <ButtonStopped onClick={() => player.cls.playStop()}>
            <Icon>play_arrow</Icon>
          </ButtonStopped>
        );
      }

      if (countdown.value === 0 || countdown.value >= 100) {
        return (
          <CircularProgress
            color="inherit"
            size={30} />
        );
      }

      return (
        <ProgressBox>

          {logoUrl ? (
            <LogoDiv>
              <img src={logoUrl} />
            </LogoDiv>
          ) : ''}

          <div data-progress>
            <Progress />
          </div>

          <div data-helpertext>
            Loading 3D
          </div>

        </ProgressBox>
      );
    }

    return (
      <div>

        {videoUrl ? (
          <VideoCover>
            <video loop autoPlay muted>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </VideoCover>
        ) : ''}

        {renderPreloader()}
      </div>
    )
  }

  const playerLoaded = player.state.loaded
  return (
    <RootBox data-loaded={playerLoaded}>
      {renderInner()}
    </RootBox>
  )
}


Preloader.propTypes = {
  logoUrl: PropTypes.string,
  videoUrl: PropTypes.string,
};

export default Preloader