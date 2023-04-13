export const blobToBase64 = (blob: Blob):Promise<string> => {

  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
      resolve(reader.result as string)
    };
    reader.readAsDataURL(blob);
  })
  
}