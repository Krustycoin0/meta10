import * as React from 'react';

// styles
import { styled } from 'metalib/styles/'

// material
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';


// commands
import useBridge from './useBridge'


const SubmenuList = styled.div(theme => ({
  display: 'flex',
  flexDirection: 'column',
  // gap: theme.spacing(1),
  padding: theme.spacing(1, 0),
  minWidth: 200,
  '& > li': {
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    ...theme.typography.body1,
    // minHeight: 50,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, .1)',
    },
    '& > img': {
      width: 60,
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2),
    }
  }
}))


export default function ScrollableTabsButtonVisible() {
  const bridge = useBridge()

  const [value, setValue] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const refPoperTimeout = React.useRef(null)

  const handleChange = (event, item) => {

    const newValue = item.slug
    setValue(newValue);
    setAnchorEl(event.currentTarget);

    clearTimeout(refPoperTimeout.current)

    item.onClick()
    // console.error('@@item', item)
  };

  const handleClose = () => {

    refPoperTimeout.current = setTimeout(() => {

      if (value !== 'views') {
        bridge.resetView()
      }

      setValue(null)
      setAnchorEl(null);

    }, 500)

  };


  const renderItems = () => {

    let items = []
    for (let item of bridge.menu) {
      if (item.slug === value) {
        // console.error('item', item.items)
        items = item.items
        break;
      }
    }

    return (
      <SubmenuList>
        {items.map((item, index) => (
          <li key={index} onClick={() => item.onClick()}>
            {item.src ? (
              <img src={item.src} />
            ) : ''}
            {item.label}
          </li>
        ))}
      </SubmenuList>
    )
  }

  const renderPopover = () => {
    const open = Boolean(anchorEl);

    return (
      <Popper open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        sx={{
          width: {
            xs: '100%',
            md: 'auto',
          },
        }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              onMouseEnter={() => clearTimeout(refPoperTimeout.current)}
              onMouseLeave={handleClose}
              sx={{
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                marginBottom: {
                  md: 1,
                },
                borderRadius: {
                  xs: 0,
                  md: 1,
                },
              }}>
              {/* <Typography sx={{ p: 2 }}>The content of the Popper.</Typography> */}
              {renderItems()}
            </Paper>
          </Fade>
        )}
      </Popper>
    )
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'common.black',
        borderRadius: {
          md: 1
        },
      }}
    >

      {renderPopover()}

      <Tabs
        value={value}
        // onChange={handleChange}
        variant="scrollable"
        scrollButtons
        sx={{
          pointerEvents: 'all',
          '& .MuiTabs-indicator': {
            top: 0,
          },
          // '& .Mui-selected': {
          // },
          [`& .${tabsClasses.scrollButtons}`]: {
            display: 'flex',
            '&.Mui-disabled': {
              opacity: 0.3
            },
          },
        }}
      >
        {bridge.menu.map((item, index) => (
          <Tab
            value={item.slug}
            onMouseEnter={(event) => {
              handleChange(event, item)
            }}
            onClick={(event) => {
              handleChange(event, item)
            }}
            onMouseLeave={handleClose}
            sx={{ py: 2, px: 3 }}
            key={index}
            label={item.label} />
        ))}

      </Tabs>
    </Box>
  );
}
