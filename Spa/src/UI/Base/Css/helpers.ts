export const identifyElementOverflown = (element: HTMLElement): void => {
  
  if (element.clientHeight > window.innerHeight || element.clientWidth > window.innerWidth ) {
  }
  if (element.hasChildNodes) {
    for (var i = 0; i < element.childNodes.length; i++) {
      identifyElementOverflown(element.childNodes[i] as HTMLElement)    
    }
  }
}
