export const SET_FORM_LOCATION = 'SET_FORM_LOCATION';
export const SET_MAP_LAYER = 'SET_MAP_LAYER';
export const SET_MAP_LOCATION = 'SET_MAP_LOCATION';
export const SET_MAP_VIEW = 'SET_MAP_VIEW';
export const SET_PAGE = 'SET_PAGE';
export const SET_PROJECTION_MODE = 'SET_PROJECTION_MODE';
export const SET_PROJECTION_RESULT = 'SET_PROJECTION_RESULT';
export const SET_RECOMMENDATION_MODE = 'SET_RECOMMENDATION_MODE';
export const SET_WELCOME_MODAL = 'SET_WELCOME_MODAL';

export function setFormLocation(formLocation) {
  return { type: SET_FORM_LOCATION, formLocation };
}

export function setMapLayer(mapLayer) {
  return { type: SET_MAP_LAYER, mapLayer };
}

export function setMapView(mapView) {
  return { type: SET_MAP_VIEW, mapView };
}

export function setPage(page) {
  return { type: SET_PAGE, page };
}

export function setMapLocation(mapLocation) {
  return { type: SET_MAP_LOCATION, mapLocation };
}

export function setProjectionMode(projectionMode) {
  return { type: SET_PROJECTION_MODE, projectionMode };
}

export function setProjectionResult(projectionResult, location) {
  return { type: SET_PROJECTION_RESULT, projectionResult, location };
}

export function setRecommendationMode(recommendationMode) {
  return { type: SET_RECOMMENDATION_MODE, recommendationMode };
}

export function setWelcomeModal(open) {
  return { type: SET_WELCOME_MODAL, open };
}
