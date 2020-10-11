import { useCallback, useEffect, useState } from 'react';

// Types
import { Coordinates } from '../types-and-interfaces/components/OceanoContextMenu.types';

/**
 * A hook to be used with 'OceanoContextMenu' component
 *
 * @param componentRef the reference to the component that is going to use 'contextmenu'
 * @param uniqueId identification for 'OceanoContextMenu' component that was just opened
 */
export default function useContextMenu(
  componentRef: HTMLDivElement | null,
  uniqueId: string
) {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();

    const { xPosition, yPosition } = calculateContextMenuPosition(
      e.pageX,
      e.pageY
    );

    setXPosition(xPosition);
    setYPosition(yPosition);
    setShowContextMenu(true);

    /**
     * When 'contextmenu' event is triggered it closes all the remaining context menus
     * that may be rendered on the DOM.
     */
    removeRemainingContextMenus(
      document.querySelectorAll('[id^="oceanocontextmenu-id"]')
    );
  }, []);

  const handleClick = useCallback(
    () => showContextMenu && setShowContextMenu(false),
    [showContextMenu]
  );

  /**
   * This function calculates positions for the best fit of the context menu
   * on the page.
   *
   * @param xPosition element position on the page x coordinate
   * @param yPosition element position on the page y coordinate
   */
  const calculateContextMenuPosition = (
    xPosition: number,
    yPosition: number
  ): Coordinates => {
    const elementWidth = document.getElementById(uniqueId)?.offsetWidth || 0;
    const windowInnerWidth = window.innerWidth - 30;

    const elementHeight = document.getElementById(uniqueId)?.offsetHeight || 0;
    const windowInnerHeight = window.innerHeight - 30;

    return {
      xPosition:
        xPosition + elementWidth >= windowInnerWidth
          ? xPosition - elementWidth
          : xPosition,
      yPosition:
        yPosition + elementHeight >= windowInnerHeight
          ? yPosition - elementHeight
          : yPosition,
    };
  };

  /**
   * This function removes all context menus from the DOM except the one that is
   * rendered in the moment.
   *
   * @param elements reference to all 'OceanoContextMenu' components rendered in the DOM
   */
  const removeRemainingContextMenus = (elements: NodeListOf<Element>) => {
    Array.from(elements)
      .filter((element: Element) => element.id !== uniqueId)
      .forEach((element: Element) => (element as HTMLElement).click());
  };

  useEffect(() => {
    // console.log(componentRef);

    document.addEventListener('click', handleClick);
    componentRef?.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.addEventListener('click', handleClick);
      componentRef?.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return { xPosition, yPosition, showContextMenu };
}
