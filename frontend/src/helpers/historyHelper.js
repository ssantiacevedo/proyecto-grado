import { createBrowserHistory } from 'history';

export const historyHelper = createBrowserHistory();

export function navigateTo(path, data) {
  historyHelper.push({ pathname: path, data });
}
