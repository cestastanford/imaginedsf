/*
* Defines action type constants.
*/

export const MAPS_REQUESTED = 'MAPS_REQUESTED';
export const MAPS_RECEIVED = 'MAPS_RECEIVED';
export const NARRATIVES_REQUESTED = 'NARRATIVES_REQUESTED';
export const NARRATIVES_RECEIVED = 'NARRATIVES_RECEIVED';
export const CONTENT_REQUESTED = 'CONTENT_REQUESTED';
export const CONTENT_RECEIVED = 'CONTENT_RECEIVED';


/*
* Defines action creators.
*/

export const mapsRequested = () => ({
  type: MAPS_REQUESTED,
});

export const mapsReceived = (maps, proposalRanges, basemaps) => ({
  type: MAPS_RECEIVED,
  maps,
  proposalRanges,
  basemaps,
});

export const narrativesRequested = () => ({
  type: NARRATIVES_REQUESTED,
});

export const narrativesReceived = (narratives) => ({
  type: NARRATIVES_RECEIVED,
  narratives,
});

export const contentRequested = (contentArea) => ({
  type: CONTENT_REQUESTED,
  contentArea,
});

export const contentReceived = (contentArea, content) => ({
  type: CONTENT_RECEIVED,
  contentArea,
  content,
});


/*

function requestNarratives() {
  return (dispatch) => {

    dispatch(narrativesRequested())
    const promise = fetch('/json-api/narratives');
    promise.then((payload) => {

      dispatch(narrativesReceived(payload))

    })

  }
}

*/
