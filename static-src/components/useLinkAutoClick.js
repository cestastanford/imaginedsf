import { useRef, useCallback } from 'react';
import throttle from 'lodash.throttle';

const DOWN = 'DOWN';
const UP = 'UP';
export const AUTO_CLICKED_CLASS = 'auto-clicked';
const AUTO_CLICK_THROTTLE_WAIT = 500;

export default function useLinkAutoClick() {
  const scrollingContainerRef = useRef();
  const lastScrollPositionRef = useRef(0);
  const lastScrollDirectionRef = useRef(DOWN);
  const clickQueueRef = useRef(new Set());
  const alreadyClickedRef = useRef(new Set());
  const lastClickedRef = useRef();

  const scrollHandlerRef = useRef(throttle(() => {
    const scrollPosition = scrollingContainerRef.current.scrollTop;
    const scrollDirection = scrollPosition > lastScrollPositionRef.current ? DOWN : UP;
    lastScrollPositionRef.current = scrollPosition;

    //  Reset queue if scroll direction changed
    if (scrollDirection !== lastScrollDirectionRef.current) {
      clickQueueRef.current = new Set();
      alreadyClickedRef.current = new Set();
    }

    lastScrollDirectionRef.current = scrollDirection;

    //  Get links that are in view
    const {
      top: containerTop,
      height: containerHeight,
    } = scrollingContainerRef.current.getBoundingClientRect();

    const yContainer = [containerTop, containerTop + containerHeight];
    const visibleLinksArray = [...scrollingContainerRef.current.querySelectorAll('a')].filter((link) => {
      if (link.getAttribute('href') && link.getAttribute('href')[0] === '#') {
        const {
          top: linkTop,
          height: linkHeight,
        } = link.getBoundingClientRect();

        const yLink = [linkTop, linkTop + linkHeight];
        if (yLink[0] > yContainer[0] && yLink[1] < yContainer[1]) {
          return true;
        }
      }

      return false;
    });

    //  Click links from top to bottom if scrolling down, bottom
    //  top if scrolling up
    if (scrollDirection === UP) {
      visibleLinksArray.reverse();
    }

    const visibleLinks = new Set(visibleLinksArray);

    //  Add links that are in view and not already clicked to the
    //  queue
    [...visibleLinks].forEach((visibleLink) => {
      if (!alreadyClickedRef.current.has(visibleLink)) {
        clickQueueRef.current.add(visibleLink);
      }
    });

    //  Remove links that are no longer in view from the queue and
    //  the clicked links
    [...clickQueueRef.current, ...alreadyClickedRef.current].forEach((queuedLink) => {
      if (!visibleLinks.has(queuedLink)) {
        clickQueueRef.current.delete(queuedLink);
        alreadyClickedRef.current.delete(queuedLink);
      }
    });

    //  Pop link from queue and click
    if (clickQueueRef.current.size) {
      const link = clickQueueRef.current.values().next().value;
      clickQueueRef.current.delete(link);
      alreadyClickedRef.current.add(link);
      link.click();
    }
  }, AUTO_CLICK_THROTTLE_WAIT, { leading: false, trailing: false }));

  const clickHandler = useCallback((event) => {
    if (event.target !== lastClickedRef.current) {
      if (lastClickedRef.current) {
        lastClickedRef.current.classList.remove(AUTO_CLICKED_CLASS);
      }

      event.target.classList.add(AUTO_CLICKED_CLASS);
      lastClickedRef.current = event.target;
    }
  }, []);

  return { ref: scrollingContainerRef, onScroll: scrollHandlerRef.current, onClick: clickHandler };
}
