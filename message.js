/** 
 * Print message in left side bar
 * 
 * @param text
 *          the message that will be print in left side bar, should be a str
 * @returns 
 * 
 * @calls
 */
export function message(text) {
    // Get the message box element by its ID
    var messageBox = document.getElementById('messageBox');

    // Update the content of the message box
    messageBox.innerHTML = '<p>' + text + '</p>';
}