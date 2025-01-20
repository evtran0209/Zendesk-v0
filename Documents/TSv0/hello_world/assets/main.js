document.addEventListener('DOMContentLoaded', function () {
    console.log('Widget Initialized');
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '600px' });

    // Flag to prevent multiple sequences
    let isSequenceRunning = false;

    // Function to update risk score with animation
    function updateRiskScore(score) {
        const scoreDiv = document.querySelector('.text-3xl');
        const riskLevelDiv = document.querySelector('.text-xl');
        
        // Show loading animation
        scoreDiv.textContent = 'Score updating';
        scoreDiv.style.opacity = '0.7';
        
        const dots = document.createElement('span');
        dots.className = 'streaming-dots';
        dots.textContent = '...';
        scoreDiv.appendChild(dots);

        // Update score after 2 seconds
        setTimeout(() => {
            scoreDiv.textContent = `${score}%`;
            scoreDiv.style.opacity = '1';
            riskLevelDiv.textContent = 'Slight Risk';
            riskLevelDiv.style.color = '#ffc107';
        }, 2000);
    }

    // Function to show streaming animation
    function showStreaming() {
        const section = document.querySelector('#identity-section ul');
        if (!section) return;

        const streamingDiv = document.createElement('div');
        streamingDiv.className = 'streaming-animation';
        streamingDiv.textContent = 'Analyzing customer profile';
        streamingDiv.style.color = '#666';
        streamingDiv.style.fontStyle = 'italic';
        streamingDiv.style.padding = '10px';
        streamingDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
        
        const dots = document.createElement('span');
        dots.className = 'streaming-dots';
        dots.textContent = '...';
        streamingDiv.appendChild(dots);

        section.appendChild(streamingDiv);
        return streamingDiv;
    }

    // Function to add a message with fade-in effect
    function addBulletPoint(text, color) {
        const section = document.querySelector('#identity-section ul');
        if (!section) {
            console.error('Could not find identity-section ul');
            return;
        }

        const li = document.createElement('li');
        li.className = 'bullet-point';
        li.textContent = text;
        li.style.color = color;
        li.style.opacity = '0';
        li.style.transition = 'opacity 0.5s ease-in';
        li.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
        li.style.fontSize = '14px';
        li.style.fontWeight = '500';
        
        section.appendChild(li);
        
        setTimeout(() => {
            li.style.opacity = '1';
        }, 50);
    }

    // Function to add conversation section
    function addConversationSection() {
        const riskSummary = document.querySelector('.risk-summary');
        const conversationSection = document.createElement('div');
        conversationSection.id = 'conversation-section';
        conversationSection.className = 'risk-section';
        conversationSection.innerHTML = `
            <div class="section-header">
                <span>💬</span>
                Conversation Behavior
            </div>
            <ul style="margin: 0; padding: 0;">
                <!-- Messages will be added here -->
            </ul>
        `;
        riskSummary.appendChild(conversationSection);

        // Add streaming animation
        const streamingDiv = document.createElement('div');
        streamingDiv.className = 'streaming-animation';
        streamingDiv.textContent = 'Analyzing conversation';
        streamingDiv.style.color = '#666';
        streamingDiv.style.fontStyle = 'italic';
        streamingDiv.style.padding = '10px';
        streamingDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
        
        const dots = document.createElement('span');
        dots.className = 'streaming-dots';
        dots.textContent = '...';
        streamingDiv.appendChild(dots);

        conversationSection.querySelector('ul').appendChild(streamingDiv);
    }

    // Function to handle the sequence of messages
    function startMessageSequence() {
        if (isSequenceRunning) {
            console.log('Sequence already running');
            return;
        }
        
        console.log('Starting message sequence');
        isSequenceRunning = true;

        // Clear existing content
        const section = document.querySelector('#identity-section ul');
        if (section) {
            section.innerHTML = '';
        }

        // First message
        const streamingDiv1 = showStreaming();
        setTimeout(() => {
            streamingDiv1.remove();
            addBulletPoint('Account Creation Velocity: High', '#dc2626');
            
            // Second message
            const streamingDiv2 = showStreaming();
            setTimeout(() => {
                streamingDiv2.remove();
                addBulletPoint('Phone # and Device IP: Known Refund Fraudster', '#dc2626');
                
                // Third message (new DNA claims bullet)
                const streamingDiv3 = showStreaming();
                setTimeout(() => {
                    streamingDiv3.remove();
                    addBulletPoint('3 DNA refund claims associated with this email detected in cross-merchant network in past week', '#dc2626');
                    
                    // Fourth message (updated shipping address mismatch)
                    const streamingDiv4 = showStreaming();
                    setTimeout(() => {
                        streamingDiv4.remove();
                        addBulletPoint('Shipping Address/Billing Address Mismatch: Medium', '#eab308');
                        
                        // Fifth message
                        const streamingDiv5 = showStreaming();
                        setTimeout(() => {
                            streamingDiv5.remove();
                            addBulletPoint('Phone #: Linked to Known Telegram Fraudster', '#f97316');
                            
                            // Sixth message
                            const streamingDiv6 = showStreaming();
                            setTimeout(() => {
                                streamingDiv6.remove();
                                addBulletPoint('Email Linked to Unusual Order Patterns: $500+ value orders followed by refund request', '#f97316');
                                
                                // Update risk score after last bullet point
                                updateRiskScore(23);
                                
                                // Add conversation section after score update
                                setTimeout(() => {
                                    addConversationSection();
                                }, 2000);
                                
                                isSequenceRunning = false;
                                console.log('Sequence complete');
                            }, 3000);
                        }, 3000);
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 3000);
    }

    // Listen for comments using multiple events to ensure we catch it
    client.on('comment.text.changed', function(data) {
        console.log('Comment text changed:', data);
        startMessageSequence();
    });

    client.on('ticket.commented', function(data) {
        console.log('Ticket commented:', data);
        startMessageSequence();
    });

    // Log when app is ready
    client.on('app.registered', function() {
        console.log('App registered and ready');
        client.invoke('resize', { width: '100%', height: '600px' });
    });
});