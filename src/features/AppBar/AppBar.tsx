import { Box } from "grommet";
import { ReactElement } from "react";

export function AppBar(props: { children: (string | ReactElement)[] }) {
  const { children } = props;

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      {children}
    </Box>
  );
}