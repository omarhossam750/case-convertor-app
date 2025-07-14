const textEntry = document.getElementById("text-entry");
const result = document.getElementById("result");
let isThereStop = false;
const copyBtn = document.getElementById("copy-btn");
const msg = document.getElementById("msg")

function updateResult() {
  try {
    let content = textEntry.value.split(" ");
    let resultValue = content[0][0].toUpperCase() + content[0].slice(1, content[0].length) + " ";
    content = content.slice(1, content.length)
    
    content.forEach(word => {
      if (isThereStop) { 
        resultValue += (word.length > 1) ? word[0].toUpperCase() + word.slice(1, word.length) + " " : word.toUpperCase();
        result.textContent = resultValue;
        isThereStop = false;
        return;
      }
      if (word.length === 1 && word.toLowerCase().startsWith("i")) resultValue += "I "; 
      else if (word.endsWith(".")) {
        resultValue += word + " "; 
        isThereStop = true;
      } else if (word.toLowerCase().startsWith("i") && (word.toLowerCase() === "i've" || word.toLowerCase() === "i'm" || word.toLowerCase() === "iam")) {
        resultValue += "I" + word.slice(1, word.length) + " ";
      }
      
      else { resultValue += word + " " }
    })
    result.textContent = resultValue;
  } catch (e) {
    result.textContent = "";
  }
}

updateResult();
textEntry.onkeyup = updateResult;

function copyToClipboard(text) {
  // Modern approach using Clipboard API
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
      // You can add visual feedback here (e.g., show a tooltip)
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
      // Fallback to older method if Clipboard API fails
      fallbackCopyToClipboard(text);
    });
}

copyBtn.onclick = function() {
  copyToClipboard(result.textContent);
  msg.style.transform = "translateX(-50%) scale(1)";
  setTimeout(function() {
    msg.style.transform = "translateX(-50%) scale(0)";
  }, 3500)
  
}
