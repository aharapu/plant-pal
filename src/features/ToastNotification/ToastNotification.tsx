// TODO -> dispatch events to queue the toast, and have this component read from the queue until it's empty

// Grommet example
/* function Example() {
  const [visible, setVisible] = React.useState();

  return (
    <Box>
      <Button label='Open Toast Notification' onClick={() => setVisible(true)} />
      <Paragraph textAlign='center'>
        This notification will disappear after 8 seconds if not dismissed via the close button.
      </Paragraph>
      {visible && (
        <Notification
          toast
          title='Toast Notification'
          message='This is an example of a toast notification'
          onClose={() => setVisible(false)}
        />
      )}
    </Box>
  );
} */

export function ToastNotification() {}
