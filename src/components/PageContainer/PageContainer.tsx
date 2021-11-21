import { Fragment } from 'react';
import { Box, Heading, ResponsiveContext } from 'grommet';
import { AppBar } from '../../features/AppBar';

export function PageContainer({ children }: any) {
  return (
    <Box fill>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Fragment>
            <AppBar>
              <Heading level='3' margin='none'>
                PlantPal is {size}
              </Heading>
            </AppBar>
            {children}
          </Fragment>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  );
}
