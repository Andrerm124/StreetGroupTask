export const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

export const useNavigation = () => mockNavigation;
