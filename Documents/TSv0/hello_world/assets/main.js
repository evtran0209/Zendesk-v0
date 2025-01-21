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

    function analyzeConversation() {
        console.log('Analyzing conversation...');
        
        // Find the conversation section
        const riskSummary = document.querySelector('.risk-summary');
        let conversationSection = document.querySelector('#conversation-section');
        
        // Create conversation section if it doesn't exist
        if (!conversationSection) {
            console.log('Creating new conversation section');
            conversationSection = document.createElement('div');
            conversationSection.id = 'conversation-section';
            conversationSection.className = 'risk-section';
            conversationSection.innerHTML = `
                <div class="section-header">
                    <span>💬</span>
                    Conversation Behavior
                </div>
                <ul style="margin: 0; padding: 0;"></ul>
            `;
            riskSummary.appendChild(conversationSection);
        }

        // Get or create the ul element
        let section = conversationSection.querySelector('ul');
        if (!section) {
            section = document.createElement('ul');
            section.style.margin = '0';
            section.style.padding = '0';
            conversationSection.appendChild(section);
        }

        // Show streaming animation
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

        // Clear existing content and add streaming
        section.innerHTML = '';
        section.appendChild(streamingDiv);

        // Add bullet point after delay
        setTimeout(() => {
            console.log('Adding bullet point');
            // Clear the streaming animation
            section.innerHTML = '';
            
            // Create and add the bullet point
            const bulletPoint = document.createElement('li');
            bulletPoint.className = 'bullet-point';
            bulletPoint.textContent = 'Story Fabrication: High Similarity to Flag Fraudulent Conversations';
            bulletPoint.style.color = '#dc2626';
            bulletPoint.style.opacity = '0';
            bulletPoint.style.transition = 'opacity 0.5s ease-in';
            bulletPoint.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
            bulletPoint.style.fontSize = '14px';
            bulletPoint.style.fontWeight = '500';
            bulletPoint.style.listStyleType = 'disc';
            bulletPoint.style.marginLeft = '20px';
            
            section.appendChild(bulletPoint);
            
            // Fade in
            setTimeout(() => {
                bulletPoint.style.opacity = '1';
            }, 50);
        }, 3000);
    }

    // Define the target text that should trigger the analysis
    const TARGET_TEXT = "Hi Evelyn, I need immediate help! I ordered a pair of jeans and a sweater for my cousin's birthday gift, and my package hasn't arrived when it said it would 3 days ago! I checked my security cameras and nothing has arrived!";

    // Listen for new ticket comments
    client.on('ticket.comments.changed', function() {
        console.log('Comments changed - checking for trigger message');
        
        // Get all ticket comments
        client.get('ticket.comments').then(function(data) {
            console.log('All comments:', data);
            
            if (data && data['ticket.comments'] && data['ticket.comments'].length > 0) {
                // Get all comments and sort by timestamp to ensure we get the latest
                const comments = data['ticket.comments'];
                const sortedComments = comments.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                
                // Get the most recent comment (first after sorting)
                const latestComment = sortedComments[0];
                console.log('Latest comment by timestamp:', latestComment);
                
                // Extract plain text from HTML comment
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = latestComment.value;
                const commentText = tempDiv.textContent || tempDiv.innerText;
                
                console.log('Extracted comment text from latest:', commentText);
                
                // Check if it matches our target text
                if (latestComment.public && commentText) {
                    // Clean up both texts for comparison (remove extra spaces)
                    const cleanedComment = commentText.replace(/\s+/g, ' ').trim();
                    const cleanedTarget = TARGET_TEXT.replace(/\s+/g, ' ').trim();
                    
                    console.log('Comparing latest comment:', {
                        comment: cleanedComment,
                        target: cleanedTarget,
                        matches: cleanedComment === cleanedTarget,
                        timestamp: latestComment.created_at
                    });
                    
                    if (cleanedComment === cleanedTarget) {
                        console.log('Found matching trigger message in latest comment!');
                        analyzeConversation();
                    } else {
                        console.log('No match in latest comment.');
                    }
                }
            }
        }).catch(function(error) {
            console.error('Error getting comments:', error);
        });
    });

    // Keep existing app.registered event
    client.on('app.registered', function() {
        console.log('App registered and ready');
        client.invoke('resize', { width: '100%', height: '600px' });
        startMessageSequence();
    });
});