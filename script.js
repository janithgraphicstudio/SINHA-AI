  // AI Search Bar Typing Effect
        const aiTypingTextElement = document.getElementById('aiTypingText');
        const aiWelcomeText = "Hi I'am SINHA AI Assistant\" How Can I Help You Today";
        let k = 0;

        function typeAiText() {
            if (k < aiWelcomeText.length) {
                aiTypingTextElement.innerHTML += aiWelcomeText.charAt(k);
                k++;
                setTimeout(typeAiText, 50);
            }
        }

        // Welcome Popup Typing Effect
        const typingSubtitle = document.getElementById('typingSubtitle');
        const welcomeText = "Try The Latest Features Powered by Artificial Intelligence";
        let i = 0;

        function typeWriter() {
            if (i < welcomeText.length) {
                typingSubtitle.innerHTML += welcomeText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Message Section Typing Effect
        const messageTitle = document.getElementById('typingMessageTitle');
        const messageText = "Share your problems and suggestions with us";
        let j = 0;

        function typeMessage() {
            if (j < messageText.length) {
                messageTitle.innerHTML += messageText.charAt(j);
                j++;
                setTimeout(typeMessage, 50);
            }
        }

        // Welcome Button Click Event
        const welcomeButton = document.getElementById('welcomeButton');
        const welcomePopup = document.getElementById('welcomePopup');
        const loadingContainer = document.getElementById('loadingContainer');
        const mainContainer = document.getElementById('mainContainer');

        welcomeButton.addEventListener('click', () => {
            welcomePopup.classList.add('hidden');
            loadingContainer.classList.add('active');
            
            setTimeout(() => {
                loadingContainer.classList.remove('active');
                mainContainer.classList.add('show');
                
                // Start typing effects after page loads
                typeMessage();
                typeAiText();
            }, 1500);
        });

        // Get Started Button Scroll
        const aiGetStartedButton = document.getElementById('aiGetStartedButton');

        aiGetStartedButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = aiGetStartedButton.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });

        // Signup Button Click Event
        const signupButton = document.getElementById('signupButton');
        const registeredButton = document.getElementById('registeredButton');
        const verificationPopup = document.getElementById('verificationPopup');
        const cancelVerification = document.getElementById('cancelVerification');
        const verifyButton = document.getElementById('verifyButton');
        const verificationInput = document.getElementById('verificationInput');

        // Check if user is already registered
        if (localStorage.getItem('sinhaAIRegistered') === 'true') {
            signupButton.style.display = 'none';
            registeredButton.style.display = 'flex';
        }

        signupButton.addEventListener('click', () => {
            verificationPopup.classList.add('active');
        });

        cancelVerification.addEventListener('click', () => {
            verificationPopup.classList.remove('active');
        });

        verifyButton.addEventListener('click', () => {
            if (verificationInput.value === 'UIM167658CM' || verificationInput.value === 'UIM168558CM') {
                localStorage.setItem('sinhaAIRegistered', 'true');
                signupButton.style.display = 'none';
                registeredButton.style.display = 'flex';
                verificationPopup.classList.remove('active');
                
                // Show success animation
                registeredButton.classList.add('btn-animate');
                setTimeout(() => {
                    registeredButton.classList.remove('btn-animate');
                }, 2000);
            } else {
                alert('Invalid verification code. Please try again.');
                verificationInput.value = '';
            }
        });

        // API Dashboard Functionality
        const apiCodesButton = document.getElementById('apiCodesButton');
        const apiDashboardPopup = document.getElementById('apiDashboardPopup');
        const closeApiDashboard = document.getElementById('closeApiDashboard');
        const createApiKeyBtn = document.getElementById('createApiKeyBtn');
        const manageApiBtn = document.getElementById('manageApiBtn');
        const codeStoreBtn = document.getElementById('codeStoreBtn');

        // API Dashboard Views
        const welcomeApiView = document.getElementById('welcomeApiView');
        const createApiView = document.getElementById('createApiView');
        const apiKeyDisplayView = document.getElementById('apiKeyDisplayView');
        const manageApiView = document.getElementById('manageApiView');
        const registrationWarning = document.getElementById('registrationWarning');
        const apiCreationForm = document.getElementById('apiCreationForm');

        // API Form Elements
        const apiKeyForm = document.getElementById('apiKeyForm');
        const downloadDataBtn = document.getElementById('downloadDataBtn');
        const updateApiBtn = document.getElementById('updateApiBtn');
        const deleteApiBtn = document.getElementById('deleteApiBtn');

        // Generate API Key Function
        function generateApiKey() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = 'sk-';
            for (let i = 0; i < 48; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }

        // Show API Dashboard
        apiCodesButton.addEventListener('click', () => {
            apiDashboardPopup.classList.add('active');
            showView('welcome');
        });

        // Close API Dashboard
        closeApiDashboard.addEventListener('click', () => {
            apiDashboardPopup.classList.remove('active');
        });

        // Show different views
        function showView(viewName) {
            // Hide all views
            welcomeApiView.style.display = 'none';
            createApiView.style.display = 'none';
            apiKeyDisplayView.style.display = 'none';
            manageApiView.style.display = 'none';

            // Show selected view
            switch(viewName) {
                case 'welcome':
                    welcomeApiView.style.display = 'block';
                    break;
                case 'create':
                    createApiView.style.display = 'block';
                    checkRegistrationStatus();
                    break;
                case 'display':
                    apiKeyDisplayView.style.display = 'block';
                    break;
                case 'manage':
                    manageApiView.style.display = 'block';
                    loadCurrentApiData();
                    break;
            }
        }

        // Check registration status
        function checkRegistrationStatus() {
            const isRegistered = localStorage.getItem('sinhaAIRegistered') === 'true';
            if (isRegistered) {
                registrationWarning.style.display = 'none';
                apiCreationForm.style.display = 'block';
            } else {
                registrationWarning.style.display = 'block';
                apiCreationForm.style.display = 'none';
            }
        }

        // Update button states
        function updateButtonStates() {
            const hasApiKey = localStorage.getItem('sinhaAIApiKey');
            if (hasApiKey) {
                createApiKeyBtn.style.display = 'none';
                manageApiBtn.style.display = 'block';
            } else {
                createApiKeyBtn.style.display = 'block';
                manageApiBtn.style.display = 'none';
            }
        }

        // Sidebar button events
        createApiKeyBtn.addEventListener('click', () => {
            showView('create');
        });

        manageApiBtn.addEventListener('click', () => {
            showView('manage');
        });

        codeStoreBtn.addEventListener('click', () => {
            window.open('https://www.jgs.com', '_blank');
        });

        // API Key Form Submission
        apiKeyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('apiUsername').value;
            const service = document.getElementById('apiService').value;
            const description = document.getElementById('apiDescription').value;
            
            const apiKey = generateApiKey();
            const createdDate = new Date().toLocaleDateString();
            
            // Store API data
            const apiData = {
                apiKey: apiKey,
                username: username,
                service: service,
                description: description,
                created: createdDate
            };
            
            localStorage.setItem('sinhaAIApiKey', JSON.stringify(apiData));
            
            // Display the generated API key
            document.getElementById('generatedApiKey').textContent = apiKey;
            document.getElementById('displayUsername').textContent = username;
            document.getElementById('displayService').textContent = service;
            document.getElementById('displayCreated').textContent = createdDate;
            
            showView('display');
            updateButtonStates();
            
            // Reset form
            apiKeyForm.reset();
        });

        // Download Data Project
        downloadDataBtn.addEventListener('click', () => {
            const apiData = JSON.parse(localStorage.getItem('sinhaAIApiKey'));
            const content = `SINHA AI - API Data Project
=============================

API Key: ${apiData.apiKey}
Username: ${apiData.username}
Service: ${apiData.service}
Description: ${apiData.description || 'N/A'}
Created: ${apiData.created}

Generated by SINHA AI Platform
© 2025 JGS LANKA CO.`;

            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'DataAi25jgs.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });

        // Load current API data for management
        function loadCurrentApiData() {
            const apiData = JSON.parse(localStorage.getItem('sinhaAIApiKey'));
            if (apiData) {
                document.getElementById('currentApiKey').textContent = apiData.apiKey;
                document.getElementById('currentUsername').textContent = apiData.username;
                document.getElementById('currentService').textContent = apiData.service;
                document.getElementById('editUsername').value = apiData.username;
                document.getElementById('editService').value = apiData.service;
            }
        }

        // Update API data
        updateApiBtn.addEventListener('click', () => {
            const apiData = JSON.parse(localStorage.getItem('sinhaAIApiKey'));
            const newUsername = document.getElementById('editUsername').value;
            const newService = document.getElementById('editService').value;
            
            if (newUsername && newService) {
                apiData.username = newUsername;
                apiData.service = newService;
                localStorage.setItem('sinhaAIApiKey', JSON.stringify(apiData));
                
                alert('API data updated successfully!');
                loadCurrentApiData();
            }
        });

        // Delete API key
        deleteApiBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your API key? This action cannot be undone.')) {
                localStorage.removeItem('sinhaAIApiKey');
                alert('API key deleted successfully!');
                updateButtonStates();
                showView('welcome');
            }
        });

        // More Tools Button Click Event
        const moreToolsButton = document.getElementById('moreToolsButton');

        moreToolsButton.addEventListener('click', (e) => {
            if (localStorage.getItem('sinhaAIRegistered') !== 'true') {
                e.preventDefault();
                verificationPopup.classList.add('active');
            }
        });

        // Message Form Submission
        const messageForm = document.getElementById('messageForm');

        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const message = document.getElementById('message').value;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(`${name} says: ${message}`);
            
            // Open WhatsApp with the message
            window.open(`https://wa.me/+94702001859?text=${encodedMessage}`, '_blank');
            
            // Reset form
            messageForm.reset();
            
            // Show success animation
            const submitButton = messageForm.querySelector('button');
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
                submitButton.disabled = false;
            }, 2000);
        });

        // Scroll To Top Button
        const scrollToTop = document.getElementById('scrollToTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTop.classList.add('active');
            } else {
                scrollToTop.classList.remove('active');
            }
        });

        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initialize
        typeWriter();
        updateButtonStates();