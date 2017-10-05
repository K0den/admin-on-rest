<<<<<<< HEAD
import {all, put, takeEvery} from "redux-saga/effects";
import {push} from "react-router-redux";
=======
import { all, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
>>>>>>> upstream/master
import {
  CRUD_CREATE_FAILURE,
  CRUD_CREATE_SUCCESS,
  CRUD_DELETE_FAILURE,
  CRUD_DELETE_SUCCESS,
  CRUD_GET_LIST_FAILURE,
  CRUD_GET_MANY_FAILURE,
  CRUD_GET_MANY_REFERENCE_FAILURE,
  CRUD_GET_ONE_FAILURE,
  CRUD_UPDATE_FAILURE,
  CRUD_UPDATE_SUCCESS,
} from "../../actions/dataActions";
import {showNotification} from "../../actions/notificationActions";
import resolveRedirectTo from "../../util/resolveRedirectTo";

/**
 * Side effects for fetch responses
 *
 * Mostly redirects and notifications
 */
function* handleResponse({type, requestPayload, error, payload}) {
  switch (type) {
    case CRUD_UPDATE_SUCCESS:
      return requestPayload.redirectTo
        ? yield put(
            push(
              resolveRedirectTo(
                requestPayload.redirectTo,
                requestPayload.basePath,
                requestPayload.id
              )
            )
          )
        : null;
    case CRUD_CREATE_SUCCESS:
      return requestPayload.redirectTo
        ? yield put(
            push(
              resolveRedirectTo(requestPayload.redirectTo, requestPayload.basePath, payload.data.id)
            )
          )
        : null;
    case CRUD_DELETE_SUCCESS:
      return requestPayload.redirectTo
        ? yield put(
            push(
              resolveRedirectTo(
                requestPayload.redirectTo,
                requestPayload.basePath,
                requestPayload.id
              )
            )
          )
        : null;
    case CRUD_GET_ONE_FAILURE:
      return requestPayload.basePath
        ? yield all([
            put(showNotification("aor.notification.item_doesnt_exist", "warning")),
            put(push(requestPayload.basePath)),
          ])
        : yield all([]);
    case CRUD_GET_LIST_FAILURE:
    case CRUD_GET_MANY_FAILURE:
    case CRUD_GET_MANY_REFERENCE_FAILURE:
    case CRUD_CREATE_FAILURE:
    case CRUD_UPDATE_FAILURE:
    case CRUD_DELETE_FAILURE: {
      console.error(error);
      const errorMessage =
        typeof error === "string" ? error : error.message || "aor.notification.http_error";
      return yield put(showNotification(errorMessage, "warning"));
    }
    default:
      return yield all([]);
  }
}

export default function*() {
  yield takeEvery(action => action.meta && action.meta.fetchResponse, handleResponse);
}
