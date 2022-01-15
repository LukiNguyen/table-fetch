const fakeData = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({ 
    id: `${k}`,  
  })); 
export {fakeData}