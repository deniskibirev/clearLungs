// Этот флаг автоматически true в режиме разработки и false в продакшене
export const IS_DEV = __DEV__;

// Дополнительно можно добавить другие настройки
export const APP_CONFIG = {
  appName: 'Quit Smoking App',
  version: '1.0.0',
  enableDevTools: __DEV__, // Автоматически отключается в продакшене
};