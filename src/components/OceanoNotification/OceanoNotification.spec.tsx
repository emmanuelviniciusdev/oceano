import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import OceanoNotification from './OceanoNotification';

function onCloseNotificationTest(timeout?: number) {
  const onCloseFn = jest.fn();

  render(
    <OceanoNotification type="clownfish" timeout={timeout} onClose={onCloseFn}>
      I am a notification!
    </OceanoNotification>
  );

  act(() => {
    jest.advanceTimersByTime(timeout ?? 4000);
  });

  /**
   * As the business logic to close the notification is made inside parent
   * components, ensuring that 'onClose' is triggered means that the
   * notification will be closed.
   */
  expect(onCloseFn).toBeCalled();
}

describe('OceanoNotification', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should trigger 'onClose' after predefined timeout (4000ms)", () =>
    onCloseNotificationTest());

  it("should trigger 'onClose' after 1000ms", () =>
    onCloseNotificationTest(1000));
});
