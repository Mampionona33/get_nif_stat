function copySelectedRowToClipboard() {
  const selectedElem = document.getSelection();
  if (selectedElem.rangeCount > 0) {
    const attribSelected = selectedElem.getRangeAt(0).startContainer.parentNode;
    const selectedTableRow = attribSelected.parentNode;
    const rowId = selectedTableRow.getAttribute('id');
    const elemEnts = document.getElementById(rowId);
    let toCopy = '';
    const txtArea = document.createElement('textarea');
    document.body.appendChild(txtArea);
    for (let i = 1; i < 6; i++) {
      toCopy = toCopy.concat(elemEnts.children[i].innerHTML).concat('\t');
      txtArea.value = toCopy;
      txtArea.select();
      document.execCommand('copy');
    }
    document.body.removeChild(txtArea);
  }
}

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'copy-selected-rows-to-clipboard') {
    console.log(`Command "${command}" triggered ok`);
    console.log(`tab : ${tab.id}`);
    if (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: copySelectedRowToClipboard,
      });
    }
  }
});
