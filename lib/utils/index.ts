export type ListenerFunc = (status: number) => void;
export interface GPSStateType {
  NOT_DETERMINED: number;
  RESTRICTED: number;
  DENIED: number;
  AUTHORIZED: number;
  AUTHORIZED_ALWAYS: number;
  AUTHORIZED_WHENINUSE: number;
}

export interface GPSStateListenerProps {
  openAppDetails: () => void;
  openLocationSettings: () => void;
  isMarshmallowOrAbove: () => boolean;
  isAuthorized: () => boolean;
  isDenied: () => boolean;
  isNotDetermined: () => boolean;
  addListener: (callback: ListenerFunc) => void;
  removeListener: () => void;
  getStatus: () => Promise<number>;
  requestAuthorization: (authType: number) => void;
}
