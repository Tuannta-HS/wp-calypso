import keyMirror from 'key-mirror';

const exported = {
	action: keyMirror( {
		FETCH_FEED_POST: null,
		RECEIVE_FEED_POST: null,
		MARK_FEED_POST_SEEN: null,
		RECEIVE_NORMALIZED_FEED_POST: null,
	} ),
};

export default exported;

export const { action } = exported;
