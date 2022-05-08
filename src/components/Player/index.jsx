import * as React from 'react';

// config
import { env } from 'config/'

// hooks
import { useSound } from "metalib/common/hooks/";

// material
import Box from '@mui/material/Box';

// components
import MetaEditor from 'metaeditor/';

// context
import MetaEditorProvider, { useConnection } from 'metaeditor/context/';

// snippets
import { BackPreloader } from 'metaeditor/snippets/'



const isDev = env.isDev


function Player(props) {
  const refMetaEditor = React.useRef(null)

  const intro = useSound(env.staticPath('sounds', 'intro.mp3'))

  return (
    <Box style={{
      height: 'var(--window-height)',
    }}>

      <BackPreloader />

      <MetaEditor
        ref={refMetaEditor}
        onReady={(payload) => {
          intro.play()
          // console.warn('ready', payload);
        }}
        onLoad={(payload) => {
          // console.warn('loaded', payload);
        }}
        onConnect={() => {
          // console.warn('connected');
        }}
        onRestart={() => {
          // console.warn('onRestart');
        }}
        onError={(payload) => {
          // console.error('error', payload);
        }}
        onClose={(payload) => {
          // console.error('closed', payload);
        }}
        onCommand={(payload) => {
          // console.warn('onCommand', payload);
          return payload
        }}
        onCallback={(payload) => {
          // console.warn('onCallback', payload);

          if (typeof props.onCallback === 'function') {
            return props.onCallback(payload)
          }

          return payload
        }}
        settings={{
          lifetime: {
            intervalSec: 0,
            maxFps: 30,
          },
          resolutionMode: 'command',
          volume: 1,
          quality: 1,
          pixelStreaming: {
            warnTimeout: 120,
            closeTimeout: 10,
            lockMouse: false,
            fakeMouseWithTouches: true,
          }
        }}
        metaSettings={{
          showDevTools: true,
          notifyCommands: isDev,
          notifyCallbacks: isDev,
        }}

        // Custom
        isDev={isDev}>

        {(payload) => (
          <MetaEditorProvider>
            {props.children}
          </MetaEditorProvider>
        )}
      </MetaEditor>

    </Box>
  )
}


export default Player