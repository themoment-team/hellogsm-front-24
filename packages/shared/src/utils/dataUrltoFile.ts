const dataURLtoFile = (dataUrl: string, filename: string) => {
  const splitedUrl = dataUrl.split(',');
  const mime = splitedUrl?.[0].match(/:(.*?);/)?.[1];
  const byteString = atob(splitedUrl[1]);
  let n = byteString.length;
  const uint8Array = new Uint8Array(n);
  while (n--) {
    uint8Array[n] = byteString.charCodeAt(n);
  }
  return new File([uint8Array], filename, { type: mime });
};

export default dataURLtoFile;