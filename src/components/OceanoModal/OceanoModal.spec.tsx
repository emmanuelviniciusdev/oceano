import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import OceanoModal from './OceanoModal';

describe('OceanoModal', () => {
  it('should close modal when close button is pressed', async () => {
    const { debug } = render(
      <OceanoModal open title="My modal title" text="My modal text" />
    );

    fireEvent.click(screen.getByTestId('oceano-modal-close-button'));

    // expect(screen.getByTestId('oceano-modal-wrapper')).not.toBeInTheDocument();

    debug();
  });

  //   it("should close modal when 'ESC' key is pressed", () => {});
});
