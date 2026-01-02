import type { Preview } from '@storybook/web-components';
import '../src/tokens/theme.css';
// Импортируем компоненты для регистрации
import '../src/components';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0a0f',
        },
        {
          name: 'darker',
          value: '#12121a',
        },
      ],
    },
  },
  decorators: [
    (story) => {
      const wrapper = document.createElement('div');
      wrapper.style.padding = '2rem';
      wrapper.style.backgroundColor = '#0a0a0f';
      wrapper.style.color = '#e0e0e8';
      wrapper.style.minHeight = '100vh';
      wrapper.style.fontFamily = 'var(--rell-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)';
      
      const storyResult = story();
      if (storyResult instanceof Node) {
        wrapper.appendChild(storyResult);
      } else if (storyResult instanceof DocumentFragment) {
        wrapper.appendChild(storyResult);
      } else if (typeof storyResult === 'string') {
        const temp = document.createElement('div');
        temp.innerHTML = storyResult;
        while (temp.firstChild) {
          wrapper.appendChild(temp.firstChild);
        }
      }
      
      return wrapper;
    },
  ],
};

export default preview;

