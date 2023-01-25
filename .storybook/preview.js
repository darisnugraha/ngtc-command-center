import '../src/_metronic/assets/sass/style.scss';
import '../src/_metronic/assets/sass/style.react.scss';
import 'react-toastify/dist/ReactToastify.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
