declare module 'react-notifications' {
  export var NotificationManager: {
    [T in 'info' | 'success' | 'warning' | 'error']: (
      message: string,
      title?: string,
      timeOut?: number,
      callback?: () => void,
      priority?: boolean
    ) => void;
	};
	export var NotificationContainer: React.FC
}
