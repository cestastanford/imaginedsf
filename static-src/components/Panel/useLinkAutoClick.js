import { useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

const DOWN = 'DOWN';
const UP = 'UP';
export const AUTO_CLICKED_CLASS = 'auto-clicked';
const AUTO_CLICK_MIN_SCROLL = 100;

export default function useLinkAutoClick() {
  const scrollingContainerRef = useRef();
  const lastScrollPositionRef = useRef(0);
  const lastScrollDirectionRef = useRef(DOWN);
  const clickQueueRef = useRef(new Set());
  const alreadyClickedRef = useRef(new Set());
  const lastClickedRef = useRef();
  const lastClickedScrollPositionRef = useRef();

  const scrollHandler = useCallback(() => {
    const scrollPosition = scrollingContainerRef.current.scrollTop;
    const scrollDirection = scrollPosition > lastScrollPositionRef.current ? DOWN : UP;

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

    //  Queue links from top to bottom if scrolling down, bottom
    //  top if scrolling up
    if (scrollDirection === UP) {
      visibleLinksArray.reverse();
    }

    const visibleLinks = new Set(visibleLinksArray);

    //  Reset tracking of clicked links if scroll direction changed
    if (scrollDirection !== lastScrollDirectionRef.current) {
      clickQueueRef.current = new Set();
      lastClickedScrollPositionRef.current = scrollPosition;
      if (lastClickedRef.current && visibleLinks.has(lastClickedRef.current)) {
        const alreadyClickedArray = [...visibleLinks];
        alreadyClickedArray.splice(alreadyClickedArray.indexOf(lastClickedRef.current) + 1);
        alreadyClickedRef.current = new Set(alreadyClickedArray);
      } else {
        alreadyClickedRef.current = new Set();
      }
    }

    //  Add links that are in view and not already clicked to the
    //  queue
    visibleLinksArray.forEach((visibleLink) => {
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

    //  Pop link from queue and click if has scrolled far enough
    //  since last auto click.
    if (
      clickQueueRef.current.size
      && (
        !lastClickedScrollPositionRef.current
        || Math.abs(scrollPosition - lastClickedScrollPositionRef.current) > AUTO_CLICK_MIN_SCROLL
      )
    ) {
      lastClickedScrollPositionRef.current = scrollPosition;
      const link = clickQueueRef.current.values().next().value;
      clickQueueRef.current.delete(link);
      alreadyClickedRef.current.add(link);
      link.click();
    }

    lastScrollPositionRef.current = scrollPosition;
    lastScrollDirectionRef.current = scrollDirection;
  }, []);

  const clickHandler = useCallback((event) => {
    if (event.target !== lastClickedRef.current) {
      if (lastClickedRef.current) {
        lastClickedRef.current.classList.remove(AUTO_CLICKED_CLASS);
      }

      event.target.classList.add(AUTO_CLICKED_CLASS);
      lastClickedRef.current = event.target;
    }
  }, []);

  //  Auto-click first link when new narrative is selected
  const currentNarrative = useSelector((state) => state.currentNarrative);
  useEffect(() => {
    const firstLink = [
      ...scrollingContainerRef.current.querySelectorAll('a'),
    ].find(
      (link) => link.getAttribute('href') && link.getAttribute('href')[0] === '#',
    );

    if (firstLink) {
      firstLink.click();
    }
  }, [currentNarrative]);

  return { ref: scrollingContainerRef, onScroll: scrollHandler, onClick: clickHandler };
}
