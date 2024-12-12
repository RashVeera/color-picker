chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
   if(message.type=='extractColor'){
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const parentElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE
            ? range.commonAncestorContainer.parentElement
            : range.commonAncestorContainer;
      
          if (parentElement) {
            const computedStyle = window.getComputedStyle(parentElement);
            const color = computedStyle.color;
            sendResponse(color)
          }
        }      
   }
})