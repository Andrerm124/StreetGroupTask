import React from 'react';
import { render } from 'react-native-testing-library';
import HeaderLogo from '../HeaderLogo';

describe('HeaderLogo', () => {
  it("renders the correct logo with resizeMode set to 'contain'", () => {
    const { getByA11yLabel } = render(<HeaderLogo />);
    const logoImage = getByA11yLabel('Street Group Header Logo');

    expect(logoImage).toHaveProp('source', {
      testUri: '../../../src/media/street-group.png',
    });
    expect(logoImage).toHaveStyle({ resizeMode: 'contain' });
  });
});
