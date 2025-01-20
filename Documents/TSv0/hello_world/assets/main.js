document.addEventListener('DOMContentLoaded', function () {
    console.log('Widget Initialized');
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '600px' });

    // Flag to prevent multiple sequences
    let isSequenceRunning = false;

    // Function to update risk score with animation
    function updateRiskScore(score, riskLevel, color) {
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
            riskLevelDiv.textContent = riskLevel;
            riskLevelDiv.style.color = color;
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

    // Function to add conversation bullet point
    function addConversationBulletPoint(text, color) {
        const section = document.querySelector('#conversation-section ul');
        if (!section) return;

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

    // Function to handle the sequence of messages
    function startMessageSequence() {
        if (isSequenceRunning) {
            console.log('Sequence already running');
            return;
        }
        
        // Only start if section is empty
        const section = document.querySelector('#identity-section ul');
        if (section && section.children.length === 0) {
            console.log('Starting message sequence');
            isSequenceRunning = true;

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
                    
                    // Third message
                    const streamingDiv3 = showStreaming();
                    setTimeout(() => {
                        streamingDiv3.remove();
                        addBulletPoint('3 DNA refund claims associated with this email detected in cross-merchant network in past week', '#dc2626');
                        
                        // Update risk score to 23% after red bullet points
                        updateRiskScore(23, 'Slight Risk', '#ffc107');
                        
                        // Fourth message
                        setTimeout(() => {
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
                                        addBulletPoint('Email Linked to Unusual Order Patterns: 4x $500+ orders followed by refund request detected in 2024', '#f97316');
                                        
                                        // Update risk score to 48% after all bullet points
                                        updateRiskScore(48, 'Elevated Risk', '#f97316');
                                        
                                        // Add conversation section after risk score update
                                        setTimeout(() => {
                                            // Create conversation section
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
                                                    <div class="streaming-animation" style="color: #666; font-style: italic; padding: 10px;">
                                                        Analyzing conversation<span class="streaming-dots">...</span>
                                                    </div>
                                                </ul>
                                            `;
                                            riskSummary.appendChild(conversationSection);
                                        }, 2000);
                                        
                                        isSequenceRunning = false;
                                        console.log('Sequence complete');
                                    }, 3000);
                                }, 3000);
                            }, 3000);
                        }, 2000);
                    }, 3000);
                }, 3000);
            }, 3000);
        }
    }

    let isFirstMessageAfterRefresh = true;  // Flag to track first message after refresh

    function analyzeConversation() {
        if (isFirstMessageAfterRefresh) {
            console.log('First message after refresh detected');
            const section = document.querySelector('#conversation-section ul');
            if (!section) return;

            // Remove existing streaming animation if present
            const existingStreaming = section.querySelector('.streaming-animation');
            if (existingStreaming) {
                existingStreaming.remove();
            }

            // Show new streaming animation
            const streamingDiv = document.createElement('div');
            streamingDiv.className = 'streaming-animation';
            streamingDiv.textContent = 'Analyzing conversation';
            streamingDiv.style.color = '#666';
            streamingDiv.style.fontStyle = 'italic';
            streamingDiv.style.padding = '10px';
            
            const dots = document.createElement('span');
            dots.className = 'streaming-dots';
            dots.textContent = '...';
            streamingDiv.appendChild(dots);

            section.appendChild(streamingDiv);

            // Add bullet point after streaming
            setTimeout(() => {
                streamingDiv.remove();
                addConversationBulletPoint('Story Fabrication: High Similarity to Flag Fraudulent Conversations', '#dc2626');
            }, 3000);

            isFirstMessageAfterRefresh = false;  // Reset flag after first message
        }
    }

    // Listen for new comments using the correct Zendesk events
    client.on('ticket.reply.created', function(data) {
        console.log('Reply created:', data);
        // Get the ticket requester (customer) information
        client.get('ticket.requester').then(function(requester) {
            console.log('Ticket requester:', requester);
            // Get the current user
            client.get('currentUser').then(function(currentUser) {
                console.log('Current user:', currentUser);
                // Check if the message is from the requester (Tiffany)
                if (currentUser.currentUser.id === requester['ticket.requester'].id) {
                    analyzeConversation();
                }
            });
        });
    });

    // Keep the existing comment.text.changed listener for the identity sequence
    client.on('comment.text.changed', function(data) {
        console.log('Direct comment changed:', data);
        // Only start identity sequence if it hasn't run yet
        const section = document.querySelector('#identity-section ul');
        if (section && section.children.length === 0) {
            startMessageSequence();
        }
    });

    // Start sequence when app loads
    client.on('app.registered', function() {
        console.log('App registered and ready');
        client.invoke('resize', { width: '100%', height: '600px' });
        startMessageSequence();
        
        // Reset first message flag on app load
        isFirstMessageAfterRefresh = true;
    });
});