export const fileToBlob = (file: File):Promise<Blob>=>{
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
        const blob = new Blob([new Uint8Array(e.target.result)], {type: file.type });
        resolve(blob)
    };
    reader.readAsArrayBuffer(file);
  })
}

export const fileTobase64 = (file: File):Promise<string>=>{
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e: any) => {
       resolve(reader.result as string)
    };
    reader.readAsDataURL(file);
  })
}