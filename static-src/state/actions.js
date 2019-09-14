/*
* Defines action type constants.
*/

export const CONTENT_RECEIVED = 'CONTENT_RECEIVED';


/*
* Defines action creators.
*/

export const contentReceived = (content) => ({
  type: CONTENT_RECEIVED,
  content,
});
