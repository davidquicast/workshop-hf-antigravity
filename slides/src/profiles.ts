// A single route. URL parameters never select a second presentation.
export const exporting=new URLSearchParams(location.search).get('export')==='1';
