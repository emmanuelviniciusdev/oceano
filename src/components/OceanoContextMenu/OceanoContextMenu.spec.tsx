import React from 'react';
import OceanoContextMenu from './OceanoContextMenu';
import { fireEvent, render, screen } from '@testing-library/react';

describe('OceanoContextMenu', () => {
  it(`should open and close 'OceanoContextMenu' correctly`, () => {
    render(<div data-testid="component-ref"></div>);
    render(
      <OceanoContextMenu
        componentRef={screen.getByTestId('component-ref') as HTMLDivElement}
      />
    );

    fireEvent.contextMenu(screen.getByTestId('component-ref'));
    expect(screen.queryByTestId('oceano-contextmenu')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('component-ref'));
    expect(screen.queryByTestId('oceano-contextmenu')).not.toBeInTheDocument();
  });

  it(`should have only 1 'OceanoContextMenu' rendered on the DOM when contextmenu event
  is triggered on multiple ref components`, () => {
    const arrayFromFive = () => Array.from({ length: 5 });

    arrayFromFive().forEach((v, i) =>
      render(<div key={i} data-testid={`component-ref-${i}`} />)
    );

    arrayFromFive().forEach((v, i) =>
      render(
        <OceanoContextMenu
          key={i}
          componentRef={
            screen.getByTestId(`component-ref-${i}`) as HTMLDivElement
          }
        />
      )
    );

    arrayFromFive().forEach((v, i) =>
      fireEvent.contextMenu(screen.getByTestId(`component-ref-${i}`))
    );

    const allOceanoContextMenu: HTMLElement[] = screen.getAllByTestId(
      'oceano-contextmenu'
    );

    expect(allOceanoContextMenu).toHaveLength(1);
    expect(allOceanoContextMenu[0]).toBeInTheDocument();
  });
});
