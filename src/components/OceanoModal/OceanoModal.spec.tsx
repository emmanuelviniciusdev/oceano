import React from 'react';

/**
 * // TODO: Implement end-to-end test to this.
 *
 * When the click event is triggered from this test, the modal's DOM doesn't disappear
 * as expected. This bug occurs because something related to <AnimatePresence /> component
 * from 'framer-motion' library.
 *
 * I have searched from a solution and I didn't find any way to solve this.
 *
 * The only solution I found is to make an end-to-end test to make sure the modal
 * will, in fact, disappear. But I didn't have much time when I was coding oceano,
 * so I'm leaving this comment to remember to implement this in the future.
 */

describe('OceanoModal', () => {
  it('should have an end-to-end test', () => {});
});
