export function message(text) {
    // Get the message box element by its ID
    var messageBox = document.getElementById('messageBox');

    // Update the content of the message box
    messageBox.innerHTML = '<p>' + text + '</p>';
}