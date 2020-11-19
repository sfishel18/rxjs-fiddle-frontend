import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
} from '@chakra-ui/react';
import React, { Suspense } from 'react';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import OutputVizContainer from '../containers/OutputVizContainer';
import OutputErrorBoundary from './OutputErrorBoundary';
import OutputLoadingSpinner from './OutputLoadingSpinner';

const themeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
const theme = extendTheme({ config: themeConfig });

interface Props {
  onRunFiddle: () => void;
  examples: Array<{ label: string; id: string }>;
  onExampleSelect: (id: string) => void;
}

const App: React.FC<Props> = props => (
  <ChakraProvider theme={theme}>
    <Box height="100vh" padding="10px 15px">
      <Stack direction="row" spacing={5} style={{ height: '100%' }}>
        <Flex key="code-editor-section" as="section" direction="column" flex="1 1 0" height="100%">
          <Stack as="header" direction="row" spacing={15} style={{ marginBottom: '15px' }}>
            <Button onClick={props.onRunFiddle}>Run</Button>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Examples
              </MenuButton>
              <Portal>
                <MenuList>
                  {props.examples.map(({ label, id }) => (
                    <MenuItem key={id} onClick={() => props.onExampleSelect(id)}>
                      {label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </Stack>
          <Box border="1px solid" borderRadius={5} padding={5} flexGrow={1}>
            <CodeEditorContainer />
          </Box>
        </Flex>
        <Flex
          key="output-viz-section"
          as="section"
          direction="column"
          border="1px solid"
          borderRadius={5}
          position="relative"
          padding={5}
          flex="1 1 0"
        >
          <Suspense fallback={<OutputLoadingSpinner />}>
            <OutputErrorBoundary>
              <OutputVizContainer />
            </OutputErrorBoundary>
          </Suspense>
        </Flex>
      </Stack>
    </Box>
  </ChakraProvider>
);

export default App;
