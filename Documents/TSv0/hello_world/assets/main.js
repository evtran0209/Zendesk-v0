document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Content Loaded');
    var client = ZAFClient.init();
    console.log('ZAF Client initialized');
    
    client.invoke('resize', { width: '100%', height: '200px' });

    // Listen for new comments using comment.text.changed event
    client.on('comment.text.changed', function(data) {
        console.log('New comment detected:', data);
        var container = document.getElementById('content');
        
        // Create a new paragraph element
        var newMessage = document.createElement('p');
        newMessage.textContent = 'Hello, World!';
        
        // Append the new message to the container
        container.appendChild(newMessage);
        
        // Resize the app to fit new content
        client.invoke('resize', { width: '100%', height: container.scrollHeight + 'px' });
    });

    // Also listen for ticket updates as a backup
    client.on('ticket.updated', function(data) {
        console.log('Ticket updated:', data);
        var container = document.getElementById('content');
        
        // Create a new paragraph element
        var newMessage = document.createElement('p');
        newMessage.textContent = 'Hello, World!';
        
        // Append the new message to the container
        container.appendChild(newMessage);
        
        // Resize the app to fit new content
        client.invoke('resize', { width: '100%', height: container.scrollHeight + 'px' });
    });
});