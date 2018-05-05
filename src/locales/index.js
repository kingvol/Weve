import I18n from 'react-native-i18n';
import en from './en.json';
import ru from './ru.json';
import tr from './tr.json';

I18n.fallbacks = true;
I18n.translations = {
  en,
  tr,
  ru,
  tm: ru,
};

export default I18n;
