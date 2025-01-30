document.addEventListener('DOMContentLoaded', function () {
    console.log('Widget Initialized');
    const client = ZAFClient.init();
    client.invoke('resize', { width: '420px', height: '600px' });  // Adjusted width

    // Add CSS for sticky risk score
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        body {
            width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
            padding: 0 !important;
            margin: 0 !important;
        }

        #app {
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
            padding-top: 80px; /* Add space for the sticky header */
            position: relative;
            box-sizing: border-box;
        }

        .risk-score-sticky {
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 16px;
            z-index: 100;
            border-bottom: 1px solid #eee;
            width: 100%;
            max-width: 420px;
            box-sizing: border-box;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .risk-summary {
            padding: 16px;
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
            box-sizing: border-box;
        }

        .risk-section {
            width: 100%;
            box-sizing: border-box;
        }

        .card-content {
            width: 100%;
            box-sizing: border-box;
        }

        .card-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 8px;
            flex-wrap: nowrap;
        }

        .card-header h4 {
            flex: 1;
            margin-right: 8px;
        }

        .severity-badge {
            white-space: nowrap;
        }
    `;
    document.head.appendChild(styleSheet);

    // Wrap the risk score elements in a sticky container
    const riskScoreHtml = `
        <div class="risk-score-sticky">
            <div class="flex items-center justify-center mb-4">
                <div class="text-center">
                    <div class="text-3xl font-bold">0%</div>
                    <div class="text-xl" style="color: #22c55e">No Risk</div>
                </div>
            </div>
        </div>
    `;

    // Insert the sticky risk score at the top of the risk-summary only if it doesn't exist
    const riskSummary = document.querySelector('.risk-summary');
    const existingRiskScore = document.querySelector('.risk-score-sticky');
    if (riskSummary && !existingRiskScore) {
        riskSummary.insertAdjacentHTML('afterbegin', riskScoreHtml);
    }

    // Flag to prevent multiple sequences
    let isSequenceRunning = false;

    // Function to update risk score with animation
    function updateRiskScore(score, riskLevel, color) {
        const scoreDiv = document.querySelector('.risk-score-sticky .text-3xl');
        const riskLevelDiv = document.querySelector('.risk-score-sticky .text-xl');
        
        // Show loading animation
        scoreDiv.textContent = 'Score updating';
        scoreDiv.style.opacity = '0.7';
        
        const dots = document.createElement('span');
        dots.className = 'streaming-dots';
        dots.textContent = '...';
        scoreDiv.appendChild(dots);

        // Update score after 4 seconds
        setTimeout(() => {
            scoreDiv.textContent = `${score}%`;
            scoreDiv.style.opacity = '1';
            riskLevelDiv.textContent = riskLevel;
            riskLevelDiv.style.color = color;
        }, 4000);
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
        return new Promise(resolve => setTimeout(resolve, 4000));
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
        if (isSequenceRunning) return;
        
        const section = document.querySelector('#identity-section ul');
        if (section && section.children.length === 0) {
            isSequenceRunning = true;

            // Show initial analyzing message
            section.innerHTML = `
                <div class="streaming-animation">
                    Analyzing customer profile<span class="streaming-dots">...</span>
                </div>
            `;

            const identityCards = [
                {
                    title: 'Account Creation Velocity',
                    detail: 'Multiple accounts created in short timeframe',
                    severity: 'HIGH'
                },
                {
                    title: 'Known Fraudster Match',
                    detail: 'Phone # and Device IP match fraud database',
                    severity: 'HIGH'
                },
                {
                    title: 'Recent Did-Not-Arrive Claims',
                    detail: '3 claims detected across merchant network (7 days)',
                    severity: 'HIGH'
                },
                {
                    title: 'Address Verification',
                    detail: 'Shipping/Billing Address Mismatch',
                    severity: 'medium'
                },
                {
                    title: 'Telegram Network Match',
                    detail: 'Phone linked to known fraud network',
                    severity: 'medium'
                },
                {
                    title: 'Suspicious Order Pattern',
                    detail: '4x $500+ orders with refund requests (2024)',
                    severity: 'HIGH'
                }
            ];

            let currentIndex = 0;

            function addNextCard() {
                if (currentIndex < identityCards.length) {
                    const card = identityCards[currentIndex];
                    const cardElement = document.createElement('div');
                    cardElement.className = 'risk-card';
                    cardElement.innerHTML = `
                        <div class="card-content">
                            <div class="card-header">
                                <h4>${card.title}</h4>
                                <span class="severity-badge ${card.severity.toLowerCase()}">${card.severity}</span>
                            </div>
                            <p>${card.detail}</p>
                        </div>
                    `;
                    section.appendChild(cardElement);
                    currentIndex++;

                    // Update risk score after the first three cards
                    if (currentIndex === 3) {
                        updateRiskScore(28, 'Slight Risk', '#eab308');
                    }

                    // Check if we've added all cards
                    if (currentIndex === identityCards.length) {
                        // Update to elevated risk after last card
                        updateRiskScore(48, 'Elevated Risk', '#f97316');
                        
                        // Add conversation section
                        setTimeout(() => {
                            const riskSummary = document.querySelector('.risk-summary');
                            const conversationSection = document.createElement('div');
                            conversationSection.id = 'conversation-section';
                            conversationSection.className = 'risk-section';
                            conversationSection.innerHTML = `
                                <div class="section-header">
                                    <span class="section-icon">💬</span>
                                    <span class="section-title">Conversation Behavior</span>
                                </div>
                                <ul style="margin: 0; padding: 0; list-style: none;"></ul>
                            `;
                            riskSummary.appendChild(conversationSection);
                            isSequenceRunning = false;
                        }, 1000);
                    } else {
                        // Show analyzing animation before next card
                        const streamingDiv = document.createElement('div');
                        streamingDiv.className = 'streaming-animation';
                        streamingDiv.innerHTML = 'Analyzing customer profile<span class="streaming-dots">...</span>';
                        section.appendChild(streamingDiv);

                        setTimeout(() => {
                            streamingDiv.remove();
                            addNextCard();
                        }, 4000);
                    }
                }
            }

            // Start adding cards after initial delay
            setTimeout(() => {
                section.innerHTML = ''; // Clear initial analyzing message
                addNextCard();
            }, 4000);
        }
    }

    function analyzeConversation() {
        console.log('Analyzing conversation...');
        
        // First, check if conversation section exists, if not create it
        let conversationSection = document.querySelector('#conversation-section');
        if (!conversationSection) {
            const riskSummary = document.querySelector('.risk-summary');
            conversationSection = document.createElement('div');
            conversationSection.id = 'conversation-section';
            conversationSection.className = 'risk-section';
            conversationSection.innerHTML = `
                <div class="section-header">
                    <span class="section-icon">💬</span>
                    <span class="section-title">Conversation Behavior</span>
                </div>
                <ul style="margin: 0; padding: 0; list-style: none;"></ul>
            `;
            riskSummary.appendChild(conversationSection);
        }

        const section = conversationSection.querySelector('ul');
        if (!section) return;

        // Show analyzing message
        const streamingDiv = document.createElement('div');
        streamingDiv.className = 'streaming-animation';
        streamingDiv.innerHTML = `Analyzing conversation<span class="streaming-dots">...</span>`;
        section.appendChild(streamingDiv);

        // Add analysis after delay
        setTimeout(() => {
            streamingDiv.remove();
            
            // Add only the Story Fabrication card
            const cardElement = document.createElement('div');
            cardElement.className = 'risk-card';
            cardElement.innerHTML = `
                <div class="card-content">
                    <div class="card-header">
                        <h4>Story Fabrication Detected</h4>
                        <span class="severity-badge high">HIGH</span>
                    </div>
                    <p>High similarity to known fraudulent claims</p>
                </div>
            `;
            section.appendChild(cardElement);
        }, 4000);
    }

    // Update the ticket.comments.changed handler
    client.on('ticket.comments.changed', function() {
        console.log('Comments changed - checking for trigger messages');
        
        client.get('ticket.comments').then(function(data) {
            if (!data || !data['ticket.comments']) return;

            const comments = data['ticket.comments'];
            const sortedComments = comments.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            
            const latestComment = sortedComments[0];
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = latestComment.value || '';
            const cleanedComment = tempDiv.textContent.replace(/\s+/g, ' ').trim();

            console.log('Latest cleaned comment:', cleanedComment);

            // Story Fabrication trigger
            const TARGET_TEXT = "Listen, I ordered a pair of jeans and a sweater for my cousin's birthday gift. Your tracking info says the order was delivered 3 days ago, but I have nothing. I've already checked my security cameras. This is getting ridiculous!!";
            if (cleanedComment === TARGET_TEXT.replace(/\s+/g, ' ').trim()) {
                console.log('Story fabrication trigger found!');
                analyzeConversation();
            }

            // Proof of delivery trigger
            if (cleanedComment.includes("Yes, that's correct. And before you suggest it")) {
                console.log('Proof of delivery trigger found!');
                analyzeProofOfDelivery();
            }

            // First chargeback threat trigger
            if (cleanedComment.includes("I don't see why I have to go through all this")) {
                console.log('First chargeback threat detected!');
                analyzeChargebackThreat();
            }

            // Second chargeback threat trigger
            if (cleanedComment.includes("I don't have 3-5 days to waste")) {
                console.log('Second chargeback threat detected!');
                analyzeSecondChargebackThreat();
            }

        }).catch(function(error) {
            console.error('Error getting ticket comments:', error);
        });
    });

    // First chargeback threat - single card
    function analyzeChargebackThreat() {
        console.log('Analyzing chargeback threat...');
        
        const section = document.querySelector('#conversation-section ul');
        if (!section) return;

        // Show initial streaming animation
        const streamingDiv = document.createElement('div');
        streamingDiv.className = 'streaming-animation';
        streamingDiv.innerHTML = `Analyzing conversation<span class="streaming-dots">...</span>`;
        section.appendChild(streamingDiv);

        setTimeout(() => {
            streamingDiv.remove();
            
            const cardElement = document.createElement('div');
            cardElement.className = 'risk-card';
            cardElement.innerHTML = `
                <div class="card-content">
                    <div class="card-header">
                        <h4>Chargeback Threat Detected</h4>
                        <span class="severity-badge high">HIGH</span>
                    </div>
                    <p>Customer threatened chargeback actions to 1 other retailer in network this week</p>
                </div>
            `;
            section.appendChild(cardElement);

            // Update risk score to 72%
            setTimeout(() => {
                updateRiskScore(72, 'Severe Risk', '#ef4444');
            }, 1000);
        }, 4000);
    }

    // Second chargeback threat - two additional cards
    function analyzeSecondChargebackThreat() {
        console.log('Analyzing second chargeback threat...');
        
        const section = document.querySelector('#conversation-section ul');
        if (!section) return;

        // Show initial streaming animation
        const streamingDiv = document.createElement('div');
        streamingDiv.className = 'streaming-animation';
        streamingDiv.innerHTML = `Analyzing conversation<span class="streaming-dots">...</span>`;
        section.appendChild(streamingDiv);

        // First show the Chargeback Threat card
        setTimeout(() => {
            streamingDiv.remove();
            
            const firstCard = document.createElement('div');
            firstCard.className = 'risk-card';
            firstCard.innerHTML = `
                <div class="card-content">
                    <div class="card-header">
                        <h4>Chargeback Threat Detected</h4>
                        <span class="severity-badge high">HIGH</span>
                    </div>
                    <p>Customer threatened chargeback actions to 1 other retailer in network this week</p>
                </div>
            `;
            section.appendChild(firstCard);

            // Update risk score to 72% after first card
            setTimeout(() => {
                updateRiskScore(72, 'Severe Risk', '#ef4444');
                
                // Then proceed with the existing two cards
                const additionalCards = [
                    {
                        title: 'Refund Demand Pattern',
                        detail: 'Immediate refund demand with legal pressure. Pattern linked to Device IP',
                        severity: 'HIGH'
                    },
                    {
                        title: 'Urgency Pattern',
                        detail: 'High pressure tactics and previous chargeback history',
                        severity: 'HIGH'
                    }
                ];

                let currentIndex = 0;

                function addNextCard() {
                    if (currentIndex < additionalCards.length) {
                        const streamingDiv = document.createElement('div');
                        streamingDiv.className = 'streaming-animation';
                        streamingDiv.innerHTML = `Analyzing conversation<span class="streaming-dots">...</span>`;
                        section.appendChild(streamingDiv);

                        setTimeout(() => {
                            streamingDiv.remove();
                            
                            const card = additionalCards[currentIndex];
                            const cardElement = document.createElement('div');
                            cardElement.className = 'risk-card';
                            cardElement.innerHTML = `
                                <div class="card-content">
                                    <div class="card-header">
                                        <h4>${card.title}</h4>
                                        <span class="severity-badge ${card.severity.toLowerCase()}">${card.severity}</span>
                                    </div>
                                    <p>${card.detail}</p>
                                </div>
                            `;
                            section.appendChild(cardElement);
                            currentIndex++;

                            // Update risk score after last card to 85%
                            if (currentIndex === additionalCards.length) {
                                setTimeout(() => {
                                    updateRiskScore(85, 'Critical Risk', '#dc2626');
                                    
                                    // Add escalation button with fade-in animation
                                    const buttonContainer = document.createElement('div');
                                    buttonContainer.className = 'escalation-button-container';
                                    buttonContainer.style.opacity = '0';
                                    buttonContainer.style.transition = 'opacity 0.5s ease-in';
                                    
                                    buttonContainer.innerHTML = `
                                        <button id="escalateButton" class="escalate-button">
                                            <span class="button-text">Escalate</span>
                                        </button>
                                    `;
                                    
                                    section.appendChild(buttonContainer);
                                    
                                    // Trigger fade in
                                    setTimeout(() => {
                                        buttonContainer.style.opacity = '1';
                                    }, 100);

                                    // Add click handler with new animation
                                    const escalateButton = buttonContainer.querySelector('#escalateButton');
                                    escalateButton.addEventListener('click', () => {
                                        // Create special streaming container
                                        const automationStream = document.createElement('div');
                                        automationStream.className = 'automation-streaming';
                                        automationStream.innerHTML = `
                                            <div class="automation-text">
                                                Suggesting Resolution Tasks<span class="automation-dots">...</span>
                                            </div>
                                        `;
                                        
                                        // Replace button with streaming animation
                                        buttonContainer.innerHTML = '';
                                        buttonContainer.appendChild(automationStream);
                                        
                                        // Simulate automation suggestion
                                        setTimeout(() => {
                                            buttonContainer.innerHTML = `
                                                <button id="escalateButton" class="escalate-button" disabled>
                                                    <span class="button-text">Report Generated ✓</span>
                                                </button>
                                            `;
                                            alert('Escalation report generated and opened in new tab');
                                        }, 4000);
                                    });
                                }, 1000);
                            } else {
                                setTimeout(() => {
                                    addNextCard();
                                }, 4000);
                            }
                        }, 4000);
                    }
                }

                // Start adding the additional cards
                setTimeout(() => {
                    addNextCard();
                }, 4000);
            }, 1000);
        }, 4000);
    }

    // Keep existing app.registered event
    client.on('app.registered', function() {
        console.log('App registered and ready');
        client.invoke('resize', { width: '420px', height: '600px' });
        startMessageSequence();
    });

    // Example of a more concise card-based bullet point
    function createRiskCard(data) {
        const card = document.createElement('div');
        card.className = `risk-card ${data.severity.toLowerCase()}-risk`;
        
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="text-lg">${data.icon}</div>
                    <div>
                        <h4 class="font-medium text-gray-900">${data.title}</h4>
                        <p class="text-sm text-gray-600">${data.detail}</p>
                    </div>
                </div>
                <div class="risk-badge bg-${data.severity === 'high' ? 'red' : data.severity === 'medium' ? 'yellow' : 'green'}-50 
                    text-${data.severity === 'high' ? 'red' : data.severity === 'medium' ? 'yellow' : 'green'}-700">
                    ${data.severity.toUpperCase()}
                </div>
            </div>
        `;

        return card;
    }

    // Example usage:
    const riskData = {
        title: 'Account Creation',
        detail: 'Multiple accounts created from same IP in last 24h',
        severity: 'high',
        icon: '⚠️',
    };

    // Update the risk indicators to be more concise
    const identityIndicators = [
        {
            title: 'New Account',
            detail: 'Created 2 hours ago | 5 accounts from IP',
            severity: 'high',
            icon: '⚡'
        },
        {
            title: 'Known Fraudster',
            detail: 'Phone & IP match fraud database',
            severity: 'high',
            icon: '🚫'
        },
        {
            title: 'Recent Claims',
            detail: '3 DNA claims in last 7 days',
            severity: 'high',
            icon: '��'
        }
    ];

    // Add collapsible sections
    function createCollapsibleSection(title, icon) {
        const section = document.createElement('div');
        section.className = 'collapsible-section';
        section.innerHTML = `
            <div class="section-header" style="
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px;
                cursor: pointer;
            ">
                <span>${icon}</span>
                <h4 style="margin: 0;">${title}</h4>
                <span class="toggle-icon" style="margin-left: auto;">▼</span>
            </div>
            <div class="section-content" style="padding: 0 12px;"></div>
        `;

        // Add collapse functionality
        const header = section.querySelector('.section-header');
        const content = section.querySelector('.section-content');
        const toggleIcon = section.querySelector('.toggle-icon');

        header.addEventListener('click', () => {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            toggleIcon.textContent = content.style.display === 'none' ? '▼' : '▲';
        });

        return section;
    }

    function addQuickActions() {
        const actionsBar = document.createElement('div');
        actionsBar.className = 'quick-actions';
        actionsBar.style.cssText = `
            display: flex;
            gap: 8px;
            padding: 12px;
            border-top: 1px solid #eee;
        `;

        actionsBar.innerHTML = `
            <button class="action-btn approve" onclick="handleApprove()">
                ✅ Approve Refund
            </button>
            <button class="action-btn verify" onclick="handleVerify()">
                🔍 Request Verification
            </button>
            <button class="action-btn escalate" onclick="handleEscalate()">
                ⚡ Escalate
            </button>
        `;

        return actionsBar;
    }

    // Add macro suggestions based on risk level
    function suggestMacros(client, riskLevel) {
        client.request({
            url: '/api/v2/macros',
            type: 'GET'
        }).then(function(data) {
            const relevantMacros = data.macros.filter(macro => 
                macro.title.toLowerCase().includes(riskLevel.toLowerCase())
            );
            
            if (relevantMacros.length > 0) {
                const macroList = document.createElement('div');
                macroList.className = 'macro-suggestions';
                macroList.innerHTML = `
                    <div class="suggestion-header">Suggested Responses:</div>
                    ${relevantMacros.map(macro => `
                        <button onclick="applyMacro(${macro.id})" class="macro-btn">
                            ${macro.title}
                        </button>
                    `).join('')}
                `;
                document.querySelector('.risk-summary').appendChild(macroList);
            }
        });
    }

    // Add the Proof of Delivery analysis function
    function analyzeProofOfDelivery() {
        console.log('Analyzing proof of delivery...');
        
        let proofSection = document.querySelector('#proof-section');
        if (!proofSection) {
            const riskSummary = document.querySelector('.risk-summary');
            proofSection = document.createElement('div');
            proofSection.id = 'proof-section';
            proofSection.className = 'risk-section';
            proofSection.innerHTML = `
                <div class="section-header">
                    <span class="section-icon">📦</span>
                    <span class="section-title">Proof of Delivery</span>
                </div>
                <ul style="margin: 0; padding: 0; list-style: none;"></ul>
            `;
            riskSummary.appendChild(proofSection);
        }

        const section = proofSection.querySelector('ul');
        if (!section) return;

        // Show initial streaming animation
        section.innerHTML = `
            <div class="streaming-animation">
                Verifying delivery<span class="streaming-dots">...</span>
            </div>
        `;

        const deliveryCards = [
            {
                title: 'Delivery Status',
                detail: 'Package was delivered with photo evidence',
                severity: 'INFO',
                evidence: true
            },
            {
                title: 'Claim Verification',
                detail: 'Did-Not-Arrive claim conflicts with tracking data',
                severity: 'HIGH'
            }
        ];

        // Add first card after initial streaming
        setTimeout(() => {
            section.innerHTML = '';
            const card1 = deliveryCards[0];
            const cardElement1 = document.createElement('div');
            cardElement1.className = 'risk-card';
            cardElement1.innerHTML = `
                <div class="card-content">
                    <div class="card-header">
                        <h4>${card1.title}</h4>
                        <span class="severity-badge ${card1.severity.toLowerCase()}">${card1.severity}</span>
                    </div>
                    <p>${card1.detail}</p>
                    ${card1.evidence ? `
                        <div class="evidence-container">
                            <button class="view-evidence-btn">View</button>
                            <div class="evidence-photo" style="display: none;">
                                <img src="delivery-evidence.jpg" 
                                     alt="Delivery Evidence" 
                                     style="width: 100%; max-width: 300px; border-radius: 4px;">
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
            section.appendChild(cardElement1);

            // Add click handler for the view button
            const viewButton = cardElement1.querySelector('.view-evidence-btn');
            if (viewButton) {
                viewButton.addEventListener('click', function() {
                    const photoDiv = cardElement1.querySelector('.evidence-photo');
                    if (photoDiv.style.display === 'none') {
                        photoDiv.style.display = 'block';
                        viewButton.textContent = 'Hide';
                    } else {
                        photoDiv.style.display = 'none';
                        viewButton.textContent = 'View';
                    }
                });
            }

            // Show streaming animation before second card
            const streamingDiv = document.createElement('div');
            streamingDiv.className = 'streaming-animation';
            streamingDiv.innerHTML = `Verifying delivery<span class="streaming-dots">...</span>`;
            section.appendChild(streamingDiv);

            // Add second card after streaming
            setTimeout(() => {
                streamingDiv.remove();
                const card2 = deliveryCards[1];
                const cardElement2 = document.createElement('div');
                cardElement2.className = 'risk-card';
                cardElement2.innerHTML = `
                    <div class="card-content">
                        <div class="card-header">
                            <h4>${card2.title}</h4>
                            <span class="severity-badge ${card2.severity.toLowerCase()}">${card2.severity}</span>
                        </div>
                        <p>${card2.detail}</p>
                    </div>
                `;
                section.appendChild(cardElement2);
            }, 4000);
        }, 4000);
    }
});