// Function to create the counter object with closure
function createCounter(initialValue = 0) {
    // Store the counter's value inside the closure
    let counterValue = initialValue;
  
    // Increment method: Increase the counter by 1
    function increment() {
      counterValue += 1;
      updateUI();
    }
  
    // Decrement method: Decrease the counter by 1
    function decrement() {
      counterValue -= 1;
      updateUI();
    }
  
    // Function to update the UI with the current counter value
    function updateUI() {
      const counterElement = document.getElementById("counter");
      counterElement.innerText = counterValue;  // Update the displayed counter value
    }
  
    // Return the object that exposes the increment and decrement methods
    return {
      increment,
      decrement,
    };
  }
  
  // Create the counter starting at 0
  const counter = createCounter();
  
  // Add event listeners to the buttons
  document.getElementById("increment").addEventListener("click", counter.increment);
  document.getElementById("decrement").addEventListener("click", counter.decrement);
  