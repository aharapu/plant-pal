import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, Grommet } from 'grommet';

import { PageContainer } from './components/PageContainer';
import { UnauthorizedHome } from './pages/UnauthorizedHome';
import { AuthorizedHome } from './pages/AuthorizedHome';

const theme = {
  global: {
    colors: {
      brand: 'lightgreen',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

// TODO -> add an event handler for when user authentication status changes to "empty" redirect to login
// TODO -> create a protected route component to wrap around paths that need authentication

function App() {
  return (
    <Grommet theme={theme} themeMode='dark' full>
      <Box fill>
        <PageContainer>
          <Routes>
            <Route path='/signin' element={<UnauthorizedHome />} />
            <Route path='/home' element={<AuthorizedHome />} />
            <Route path='*' element={<Navigate to='/signin' />}></Route>
          </Routes>
        </PageContainer>
      </Box>
    </Grommet>
  );
}

export default App;
