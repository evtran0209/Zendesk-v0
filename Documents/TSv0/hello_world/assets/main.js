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
        if (isSequenceRunning) return;
        
        const section = document.querySelector('#identity-section ul');
        if (section && section.children.length === 0) {
            isSequenceRunning = true;

            // Show analyzing message
            section.innerHTML = `
                <div class="streaming-animation">
                    Analyzing customer profile<span class="streaming-dots">...</span>
                </div>
            `;

            // Add cards one by one with animation
            const identityCards = [
                {
                    title: 'Account Creation Velocity',
                    detail: 'Multiple accounts created in short timeframe',
                    severity: 'high'
                },
                {
                    title: 'Known Fraudster Match',
                    detail: 'Phone # and Device IP match fraud database',
                    severity: 'high'
                },
                {
                    title: 'Recent Did-Not-Arrive Claims',
                    detail: '3 claims detected across merchant network (7 days)',
                    severity: 'high'
                },
                {
                    title: 'Address Verification',
                    detail: 'Shipping/Billing Address Mismatch',
                    severity: 'medium'
                },
                {
                    title: 'Telegram Network Match',
                    detail: 'Phone linked to known fraud network',
                    severity: 'high'
                },
                {
                    title: 'Suspicious Order Pattern',
                    detail: '4x $500+ orders with refund requests (2024)',
                    severity: 'high'
                }
            ];

            let currentIndex = 0;
            
            function addNextCard() {
                if (currentIndex < identityCards.length) {
                    section.innerHTML = `
                        <div class="streaming-animation">
                            Analyzing customer profile<span class="streaming-dots">...</span>
                        </div>
                    `;

                    setTimeout(() => {
                        const card = identityCards[currentIndex];
                        const cardElement = document.createElement('div');
                        cardElement.className = 'risk-card';
                        cardElement.innerHTML = `
                            <div class="card-content">
                                <div class="card-header">
                                    <h4>${card.title}</h4>
                                    <span class="severity-badge ${card.severity}">${card.severity}</span>
                                </div>
                                <p>${card.detail}</p>
                            </div>
                        `;
                        section.appendChild(cardElement);
                        currentIndex++;
                        if (currentIndex < identityCards.length) {
                            addNextCard();
                        } else {
                            // All cards added, update risk score
                            updateRiskScore(48, 'Elevated Risk', '#f97316');
                            
                            // Add conversation section
                            const riskSummary = document.querySelector('.risk-summary');
                            const conversationSection = document.createElement('div');
                            conversationSection.id = 'conversation-section';
                            conversationSection.className = 'risk-section';
                            conversationSection.innerHTML = `
                                <div class="section-header">
                                    <span class="section-title">Conversation Behavior</span>
                                </div>
                                <ul style="margin: 0; padding: 0; list-style: none;"></ul>
                            `;
                            riskSummary.appendChild(conversationSection);
                            
                            isSequenceRunning = false;
                        }
                    }, 3000);
                }
            }

            addNextCard();
        }
    }

    function analyzeConversation() {
        console.log('Analyzing conversation...');
        
        const section = document.querySelector('#conversation-section ul');
        if (!section) return;

        // Show analyzing message
        section.innerHTML = `
            <div class="streaming-animation">
                Analyzing conversation<span class="streaming-dots">...</span>
            </div>
        `;

        // Add only Story Fabrication card after delay
        setTimeout(() => {
            section.innerHTML = '';
            
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
        }, 3000);
    }

    // Define trigger messages
    const TARGET_TEXT = "Listen, I ordered a pair of jeans and a sweater for my cousin's birthday gift. Your tracking info says the order was delivered 3 days ago, but I have nothing. I've already checked my security cameras. This is getting ridiculous!!";
    
    const PROOF_DELIVERY_TEXT = "Yes, that's correct. And before you suggest it, I've already done all the typical checks-porch, neighbors, mailroom. There's nothing here!";
    
    const CHARGEBACK_THREAT_TEXT = "I don't see why I have to go through all this. My package never arrived and I am entitled to a full refund compensation. I already told you it's not here! If you don't process my refund immediately, I'll just contact my bank. I know the Fair Credit Billing Act, and I can dispute this charge easily.";
    
    const CHARGEBACK_THREAT_TEXT_2 = "I don't have 3-5 days to waste. Other companies have refunded me instantly for missing packages. Why are you making this so complicated? If I don't see immediate action, I'm filing a chargeback-I've done this before, and I'm not afraid to use that option.";

    // Listen for new ticket comments
    client.on('ticket.comments.changed', function() {
        console.log('Comments changed - checking for trigger messages');
        
        client.get('ticket.comments').then(function(data) {
            if (data && data['ticket.comments'] && data['ticket.comments'].length > 0) {
                const latestComment = data['ticket.comments'][data['ticket.comments'].length - 1];
                const cleanedComment = latestComment.text.replace(/\s+/g, ' ').trim();
                
                // Check for first trigger (Story Fabrication)
                const cleanedTarget = TARGET_TEXT.replace(/\s+/g, ' ').trim();
                if (cleanedComment === cleanedTarget) {
                    console.log('Story fabrication trigger found! Starting analysis...');
                    analyzeConversation();
                }

                // Check for proof of delivery trigger
                const cleanedProofTarget = PROOF_DELIVERY_TEXT.replace(/\s+/g, ' ').trim();
                if (cleanedComment === cleanedProofTarget) {
                    console.log('Proof of delivery trigger found! Starting verification...');
                    analyzeProofOfDelivery();
                }

                // Check for first chargeback threat trigger
                const cleanedChargebackTarget = CHARGEBACK_THREAT_TEXT.replace(/\s+/g, ' ').trim();
                if (cleanedComment === cleanedChargebackTarget) {
                    console.log('Chargeback threat detected! Adding warning indicators...');
                    analyzeChargebackThreat();
                }

                // Check for second chargeback threat trigger
                const cleanedChargebackTarget2 = CHARGEBACK_THREAT_TEXT_2.replace(/\s+/g, ' ').trim();
                if (cleanedComment === cleanedChargebackTarget2) {
                    console.log('Second chargeback threat detected! Adding warning indicator...');
                    analyzeSecondChargebackThreat();
                }
            }
        });
    });

    // Keep existing app.registered event
    client.on('app.registered', function() {
        console.log('App registered and ready');
        client.invoke('resize', { width: '100%', height: '600px' });
        startMessageSequence();
    });

    // Add new function to handle chargeback threat analysis
    function analyzeChargebackThreat() {
        console.log('Analyzing chargeback threat...');
        
        const section = document.querySelector('#conversation-section ul');
        if (!section) return;

        // Show analyzing message
        const streamingDiv = document.createElement('div');
        streamingDiv.className = 'streaming-animation';
        streamingDiv.innerHTML = `Analyzing conversation<span class="streaming-dots">...</span>`;
        section.appendChild(streamingDiv);

        // Add the three cards after delay
        setTimeout(() => {
            streamingDiv.remove();
            
            const chargebackCards = [
                {
                    title: 'Urgency Level',
                    detail: 'High pressure for immediate action',
                    severity: 'high'
                },
                {
                    title: 'Excessive Chargeback Knowledge',
                    detail: 'Matches patterns from past fraudulent claims',
                    severity: 'high'
                },
                {
                    title: 'Verification Process',
                    detail: 'Customer avoiding standard verification steps',
                    severity: 'medium'
                }
            ];

            chargebackCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'risk-card';
                cardElement.innerHTML = `
                    <div class="card-content">
                        <div class="card-header">
                            <h4>${card.title}</h4>
                            <span class="severity-badge ${card.severity}">${card.severity}</span>
                        </div>
                        <p>${card.detail}</p>
                    </div>
                `;
                section.appendChild(cardElement);
            });
        }, 3000);
    }

    // Add new function to handle second chargeback threat analysis
    function analyzeSecondChargebackThreat() {
        console.log('Analyzing second chargeback threat...');
        
        const section = document.querySelector('#conversation-section ul');
        if (!section) return;

        // Show analyzing message
        const streamingDiv = document.createElement('div');
        streamingDiv.className = 'streaming-animation';
        streamingDiv.innerHTML = `Analyzing conversation<span class="streaming-dots">...</span>`;
        section.appendChild(streamingDiv);

        // Add the threatening language card after delay
        setTimeout(() => {
            streamingDiv.remove();
            
            const cardElement = document.createElement('div');
            cardElement.className = 'risk-card';
            cardElement.innerHTML = `
                <div class="card-content">
                    <div class="card-header">
                        <h4>Threatening Language</h4>
                        <span class="severity-badge high">HIGH</span>
                    </div>
                    <p>High severity (Related to Chargebacks)</p>
                </div>
            `;
            section.appendChild(cardElement);
        }, 3000);
    }

    // Example of a more concise card-based bullet point
    function createRiskCard(data) {
        const card = document.createElement('div');
        card.className = `risk-card ${data.severity}-risk`;
        
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
            ${data.actions ? `
                <div class="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                    ${data.actions.map(action => `
                        <button class="text-sm text-blue-600 hover:text-blue-800" onclick="${action.handler}">
                            ${action.icon} ${action.label}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        `;

        return card;
    }

    // Example usage:
    const riskData = {
        title: 'Account Creation',
        detail: 'Multiple accounts created from same IP in last 24h',
        severity: 'high',
        icon: '⚠️',
        actions: [
            {
                label: 'View Details',
                icon: '👁️',
                handler: 'viewAccountDetails()'
            }
        ]
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

        section.innerHTML = `
            <div class="streaming-animation">
                Verifying delivery<span class="streaming-dots">...</span>
            </div>
        `;

        setTimeout(() => {
            section.innerHTML = '';
            
            const deliveryCards = [
                {
                    title: 'Delivery Status',
                    detail: 'Package was delivered with photo evidence',
                    severity: 'info',
                    action: {
                        text: 'View Photo',
                        handler: 'viewDeliveryPhoto()'
                    }
                },
                {
                    title: 'Claim Verification',
                    detail: 'Did-Not-Arrive claim conflicts with tracking data',
                    severity: 'high'
                }
            ];

            deliveryCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.className = 'risk-card';
                cardElement.innerHTML = `
                    <div class="card-content">
                        <div class="card-header">
                            <h4>${card.title}</h4>
                            <span class="severity-badge ${card.severity}">${card.severity}</span>
                        </div>
                        <p>${card.detail}</p>
                        ${card.action ? `
                            <button onclick="${card.action.handler}" class="action-link">
                                ${card.action.text}
                            </button>
                        ` : ''}
                    </div>
                `;
                section.appendChild(cardElement);
            });
        }, 3000);
    }
});