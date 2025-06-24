import { dataURLtoFile } from 'shared/utils';

describe('dataURLtoFile', () => {
  test('이미지 파일 변환 테스트', () => {
    const dataURL = 'data:image/png;base64,iVBORw0KGgo=';
    const filename = 'test.png';
    
    const file = dataURLtoFile(dataURL, filename);
    
    expect(file.name).toBe('test.png');
    expect(file.type).toBe('image/png');
  });

  test('텍스트 파일 변환 테스트', () => {
    const dataURL = 'data:text/plain;base64,SGVsbG8=';
    const file = dataURLtoFile(dataURL, 'test.txt');
    
    expect(file.name).toBe('test.txt');
    expect(file.type).toBe('text/plain');
  });
});