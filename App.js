<!-- Sparkle Effect Script -->

        document.addEventListener('DOMContentLoaded', function() {
            // Create sparkle effect when clicking on the logo
            const logo = document.querySelector('.fa-sparkle');
            logo.addEventListener('click', function(e) {
                createSparkle(e.clientX, e.clientY);
            });
            
            function createSparkle(x, y) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle text-white';
                sparkle.innerHTML = '<i class="fas fa-sparkle"></i>';
                sparkle.style.left = `${x - 10}px`;
                sparkle.style.top = `${y - 10}px`;
                document.body.appendChild(sparkle);
                
                // Remove after animation completes
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });

 
        // Service type toggle
        const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
        const residentialType = document.getElementById('residentialType');
        const commercialType = document.getElementById('commercialType');
        
        serviceTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'residential') {
                    residentialType.classList.remove('hidden');
                    commercialType.classList.add('hidden');
                } else {
                    residentialType.classList.add('hidden');
                    commercialType.classList.remove('hidden');
                }
                calculatePrice();
                updateSummary();
            });
        });
        
        // Slider value displays
        const smallWindows = document.getElementById('smallWindows');
        const smallWindowsValue = document.getElementById('smallWindowsValue');
        const largeWindows = document.getElementById('largeWindows');
        const largeWindowsValue = document.getElementById('largeWindowsValue');
        const floors = document.getElementById('floors');
        const floorsValue = document.getElementById('floorsValue');
        
        smallWindows.addEventListener('input', function() {
            smallWindowsValue.textContent = this.value;
            calculatePrice();
            updateSummary();
        });
        
        largeWindows.addEventListener('input', function() {
            largeWindowsValue.textContent = this.value;
            calculatePrice();
            updateSummary();
        });
        
        floors.addEventListener('input', function() {
            floorsValue.textContent = this.value;
            calculatePrice();
            updateSummary();
        });
        
        // Checkbox changes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                calculatePrice();
                updateSummary();
            });
        });
        
        // Radio button changes
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                calculatePrice();
                updateSummary();
            });
        });
        
        // Calculate price function
        function calculatePrice() {
            // Get base price
            let basePrice = 0;
            const serviceType = document.querySelector('input[name="serviceType"]:checked').value;
            
            if (serviceType === 'residential') {
                const propertyType = document.querySelector('select[name="propertyType"]');
                basePrice = parseInt(propertyType.options[propertyType.selectedIndex].getAttribute('data-price'));
            } else {
                const businessType = document.querySelector('select[name="businessType"]');
                basePrice = parseInt(businessType.options[businessType.selectedIndex].getAttribute('data-price'));
            }
            
            // Calculate extras
            let totalPrice = basePrice;
            
            // Extra windows
            const smallWindowsCount = parseInt(smallWindows.value);
            const largeWindowsCount = parseInt(largeWindows.value);
            
            if (smallWindowsCount > 10) {
                totalPrice += (smallWindowsCount - 10) * 1.5; // Average £1.50 per extra small window
            }
            
            totalPrice += largeWindowsCount * 4; // Average £4 per large window
            
            // Extra floors
            const floorsCount = parseInt(floors.value);
            if (floorsCount > 1) {
                totalPrice += (floorsCount - 1) * 7.5; // Average £7.50 per extra floor
            }
            
            // Difficult access
            if (document.querySelector('input[name="access"]:checked').value === 'difficult') {
                totalPrice += 7.5; // Average £7.50 for difficult access
            }
            
            // Additional services
            if (document.querySelector('input[name="interior"]').checked) {
                totalPrice *= 2; // Double for interior cleaning
            }
            
            if (document.querySelector('input[name="firstClean"]').checked) {
                totalPrice += 10; // £10 for first clean
            }
            
            if (document.querySelector('input[name="conservatory"]').checked) {
                totalPrice += 25; // Average £25 for conservatory
            }
            
            if (document.querySelector('input[name="skylights"]').checked) {
                totalPrice += 7.5; // Average £7.50 for skylights
            }
            
            // Round to nearest £5 for cleaner pricing
            totalPrice = Math.ceil(totalPrice / 5) * 5;
            
            // Update display
            document.getElementById('estimatePrice').textContent = totalPrice;
            document.getElementById('totalPrice').textContent = totalPrice;
            document.getElementById('bookingPrice').textContent = totalPrice;
            
            // Show price badge
            document.getElementById('priceBadge').classList.remove('hidden');
            
            return totalPrice;
        }
        
        // Update service summary
        function updateSummary() {
            // Service type
            const serviceType = document.querySelector('input[name="serviceType"]:checked').value;
            document.getElementById('summaryServiceType').textContent = serviceType === 'residential' ? 'Residential' : 'Commercial';
            
            // Property type
            if (serviceType === 'residential') {
                const propertyType = document.querySelector('select[name="propertyType"]');
                document.getElementById('summaryPropertyType').textContent = propertyType.options[propertyType.selectedIndex].text;
            } else {
                const businessType = document.querySelector('select[name="businessType"]');
                document.getElementById('summaryPropertyType').textContent = businessType.options[businessType.selectedIndex].text;
            }
            
            // Windows
            document.getElementById('summarySmallWindows').textContent = smallWindows.value;
            document.getElementById('summaryLargeWindows').textContent = largeWindows.value;
            
            // Floors
            document.getElementById('summaryFloors').textContent = floors.value;
            
            // Access
            document.getElementById('summaryAccess').textContent = document.querySelector('input[name="access"]:checked').value === 'easy' ? 'Easy' : 'Difficult';
            
            // Additional services
            const additionalServices = [];
            if (document.querySelector('input[name="interior"]').checked) additionalServices.push('Interior Cleaning');
            if (document.querySelector('input[name="firstClean"]').checked) additionalServices.push('First Clean');
            if (document.querySelector('input[name="conservatory"]').checked) additionalServices.push('Conservatory');
            if (document.querySelector('input[name="skylights"]').checked) additionalServices.push('Skylights');
            
            document.getElementById('summaryAdditionalServices').textContent = 
                additionalServices.length > 0 ? additionalServices.join(', ') : 'None';
        }
        
        // Calculate button
        document.getElementById('calculateBtn').addEventListener('click', function() {
            const price = calculatePrice();
            document.getElementById('bookingForm').classList.remove('hidden');
            updateSummary();
            
            // Set minimum date for booking (tomorrow)
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const minDate = tomorrow.toISOString().split('T')[0];
            document.getElementById('preferredDate').min = minDate;
            
            window.scrollTo({
                top: document.getElementById('bookingForm').offsetTop - 20,
                behavior: 'smooth'
            });
        });
        
        // Price info popup
        const priceInfoBtn = document.getElementById('priceInfoBtn');
        const pricePopup = document.getElementById('pricePopup');
        const closePopupBtn = document.getElementById('closePopupBtn');

        priceInfoBtn.addEventListener('click', () => {
            pricePopup.classList.toggle('hidden');
        });

        closePopupBtn.addEventListener('click', () => {
            pricePopup.classList.add('hidden');
        });

        // Close popup when clicking outside
        window.addEventListener('click', (e) => {
            if (!pricePopup.contains(e.target) && e.target !== priceInfoBtn) {
                pricePopup.classList.add('hidden');
            }
        });
        
        // Form validation
        document.getElementById('bookingFormDetails').addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            
            // Validate full name
            const fullName = document.getElementById('fullName');
            if (!fullName.value.trim()) {
                document.getElementById('fullNameError').classList.remove('hidden');
                fullName.classList.add('input-error');
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').classList.remove('hidden');
                email.classList.add('input-error');
                isValid = false;
            }
            
            // Validate phone
            const phone = document.getElementById('phone');
            const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
            if (!phoneRegex.test(phone.value)) {
                document.getElementById('phoneError').classList.remove('hidden');
                phone.classList.add('input-error');
                isValid = false;
            }
            
            // Validate postcode (basic UK postcode validation)
            const postcode = document.getElementById('postcode');
            const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
            if (!postcodeRegex.test(postcode.value)) {
                document.getElementById('postcodeError').classList.remove('hidden');
                postcode.classList.add('input-error');
                isValid = false;
            }
            
            // Validate address
            const address = document.getElementById('address');
            if (!address.value.trim()) {
                document.getElementById('addressError').classList.remove('hidden');
                address.classList.add('input-error');
                isValid = false;
            }
            
            // Validate date
            const preferredDate = document.getElementById('preferredDate');
            if (!preferredDate.value) {
                document.getElementById('dateError').classList.remove('hidden');
                preferredDate.classList.add('input-error');
                isValid = false;
            }
            
            // Validate terms
            const termsAgreement = document.getElementById('termsAgreement');
            if (!termsAgreement.checked) {
                document.getElementById('termsError').classList.remove('hidden');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - show success message
                alert('Thank you for your booking! We will contact you shortly to confirm your appointment.');
                this.reset();
                document.getElementById('bookingForm').classList.add('hidden');
            }
        });
        
        // Initialize date picker min date
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const minDate = tomorrow.toISOString().split('T')[0];
            document.getElementById('preferredDate').min = minDate;
        });

        // Virtual Assistant Script
        document.addEventListener('DOMContentLoaded', function() {
            const chatMessages = document.getElementById('chat-messages');
            const userInput = document.getElementById('user-input');
            const sendBtn = document.getElementById('send-btn');
            const typingIndicator = document.getElementById('typing-indicator');
            const minimizeBtn = document.getElementById('minimize-btn');
            const minimizedChat = document.getElementById('minimized-chat');
            const openChatBtn = document.getElementById('open-chat-btn');
            const quickBtns = document.querySelectorAll('.quick-btn');
            const assistantContainer = document.getElementById('assistant-container');
            
            // Sample responses
            const responses = {
                "hello": "Hello there! How can I assist you with your window cleaning needs today?",
                "hi": "Hi! Welcome to Pristine Pane. What can I do for you?",
                "book a cleaning": "Great! To book a window cleaning service, you can use our <a href='#quote' class='text-teal-600 underline'>instant quote calculator</a> or tell me your preferred date and time and I'll check availability.",
                "pricing": "Our pricing depends on the number of windows and the type of cleaning required. For standard residential windows, we charge £5-£10 per window. Commercial pricing starts at £40 for small shops. You can get a detailed quote using our <a href='#quote' class='text-teal-600 underline'>quote calculator</a>.",
                "services": "We offer a range of services:<br><br>• Standard window cleaning<br>• High-rise window cleaning<br>• Screen cleaning<br>• Track cleaning<br>• Pressure washing for exterior surfaces<br><br>Learn more on our <a href='#services' class='text-teal-600 underline'>services page</a>.",
                "contact": "You can reach us at:<br><br>📞 Phone: 0800 123 4567<br>📧 Email: hello@pristinepanes.co.uk<br>🏢 Office: 123 Clean Street, Windowville<br><br>Our hours are Mon-Fri 8am-6pm. See our <a href='#contact' class='text-teal-600 underline'>contact page</a> for more details.",
                "thank you": "You're welcome! Is there anything else I can help you with?",
                "default": "I'm sorry, I didn't understand that. Could you rephrase or ask about our window cleaning services, pricing, or booking?"
            };
            
            // Quick button handlers
            quickBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const question = this.getAttribute('data-question');
                    userInput.value = question;
                    sendMessage();
                });
            });
            
            // Send message on button click
            sendBtn.addEventListener('click', sendMessage);
            
            // Send message on Enter key
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Minimize/maximize chat
            minimizeBtn.addEventListener('click', function() {
                assistantContainer.classList.add('hidden');
                minimizedChat.classList.remove('hidden');
            });
            
            openChatBtn.addEventListener('click', function() {
                minimizedChat.classList.add('hidden');
                assistantContainer.classList.remove('hidden');
            });
            
            function sendMessage() {
                const message = userInput.value.trim().toLowerCase();
                if (message === '') return;
                
                // Add user message to chat
                addMessage(message, 'user');
                userInput.value = '';
                
                // Show typing indicator
                typingIndicator.classList.remove('hidden');
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate bot thinking
                setTimeout(() => {
                    typingIndicator.classList.add('hidden');
                    
                    // Get appropriate response
                    let response = responses.default;
                    for (const key in responses) {
                        if (message.includes(key)) {
                            response = responses[key];
                            break;
                        }
                    }
                    
                    // Add bot response to chat
                    addMessage(response, 'bot');
                }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
            }
            
            function addMessage(content, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message-entering', 'flex');
                
                if (sender === 'user') {
                    messageDiv.classList.add('justify-end');
                    messageDiv.innerHTML = `
                        <div class="bg-teal-600 text-white p-3 rounded-lg shadow-sm max-w-xs">
                            <p>${content}</p>
                            <p class="text-xs text-teal-100 mt-1">Just now</p>
                        </div>
                        <div class="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center ml-2 flex-shrink-0">
                            <i class="fas fa-user text-sm"></i>
                        </div>
                    `;
                } else {
                    messageDiv.innerHTML = `
                        <div class="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <i class="fas fa-spray-can text-teal-600 text-sm"></i>
                        </div>
                        <div class="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                            <p>${content}</p>
                            <p class="text-xs text-gray-500 mt-1">Just now</p>
                        </div>
                    `;
                }
                
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Show the minimized chat button by default
            minimizedChat.classList.remove('hidden');
        });


     // menu Mobile //
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    })
                    
