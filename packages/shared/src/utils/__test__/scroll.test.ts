import { scrollToElement, scrollToLocation } from 'shared/utils';

// DOM 모킹
const mockScrollIntoView = jest.fn();
const mockScrollTo = jest.fn();

// querySelector 모킹
Object.defineProperty(document, 'querySelector', {
  value: jest.fn(),
  writable: true
});

// window.scrollTo 모킹
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
});

describe('scrollToElement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('요소가 존재할 때 스크롤', () => {
    const mockElement = { scrollIntoView: mockScrollIntoView };
    (document.querySelector as jest.Mock).mockReturnValue(mockElement);

    scrollToElement('#test-element');

    expect(document.querySelector).toHaveBeenCalledWith('#test-element');
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    });
  });

  test('요소가 없을 때 에러 없이 처리', () => {
    (document.querySelector as jest.Mock).mockReturnValue(null);

    expect(() => scrollToElement('#not-exist')).not.toThrow();
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });
});

describe('scrollToLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('smooth 스크롤', () => {
    scrollToLocation(100, 'smooth');

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 100,
      behavior: 'smooth'
    });
  });

  test('auto 스크롤', () => {
    scrollToLocation(500, 'auto');

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 500,
      behavior: 'auto'
    });
  });
});