import { useState } from 'react';
import { Box, Button, Grommet, Heading, ResponsiveContext } from 'grommet';
import { Notification } from 'grommet-icons';
import { AppBar } from './features/AppBar/AppBar';
import { PageContainer } from './components/PageContainer/PageContainer';

const theme = {
  global: {
    colors: {
      brand: '#121212',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

// TODO create a container element for all the pages to reside in?
// and the appbar is always there?

function App() {
  const [sidebarIsShown, setSidebarIsShown] = useState(false);

  return (
    <Grommet theme={theme} themeMode="dark" full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill>
            <AppBar>
              <Heading level="3" margin="none">
                PlantPal
              </Heading>
              <p>current &quot;responsive&quot; size is {size}</p>
              <Button
                icon={<Notification />}
                onClick={() => setSidebarIsShown(!sidebarIsShown)}
              />
            </AppBar>
            <PageContainer>place router routes in here</PageContainer>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
