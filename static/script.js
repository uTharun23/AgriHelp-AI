/* ==========================================
   AGRISIGHT AI - PREMIUM INTERACTION CONTROLLER
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    /* --------------------------------------
       1. THEME CONTROLLER & SYSTEM SETUP
       -------------------------------------- */
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const htmlElement = document.documentElement;

    // Check saved theme or system preferences
    const savedTheme = localStorage.getItem("agri-theme") || "dark";
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.classList.contains("dark-theme") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
        showToast(`Switched to ${newTheme.toUpperCase()} theme`, "🌓");
    });

    function applyTheme(theme) {
        if (theme === "dark") {
            htmlElement.className = "dark-theme";
            themeToggleBtn.innerHTML = `<span class="theme-icon">☀️</span><span class="theme-text">Light Mode</span>`;
        } else {
            htmlElement.className = "light-theme";
            themeToggleBtn.innerHTML = `<span class="theme-icon">🌙</span><span class="theme-text">Dark Mode</span>`;
        }
        localStorage.setItem("agri-theme", theme);
    }


    /* --------------------------------------
       2. SINGLE PAGE ROUTER (NAVIGATION)
       -------------------------------------- */
    const navLinks = document.querySelectorAll(".nav-link");
    const sectionPanes = document.querySelectorAll(".section-pane");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("data-target");
            
            // Update active state on nav links
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // ROUTER LOGIC:
            // "home" (Dashboard) shows ALL section panes stacked.
            // Other specific pages hide all other sections and show only the clicked one.
            if (targetId === "home") {
                sectionPanes.forEach(pane => {
                    pane.classList.remove("hidden");
                });
                showToast("Welcome to Dashboard Overview", "📊");
            } else {
                sectionPanes.forEach(pane => {
                    if (pane.id === targetId) {
                        pane.classList.remove("hidden");
                    } else {
                        pane.classList.add("hidden");
                    }
                });
                
                // Track active views for specific warnings
                if (targetId === "disease") showToast("Ready for Leaf Diagnostics Scan", "📸");
                if (targetId === "weather") showToast("Agronomic Weather Center", "🌤");
                if (targetId === "soil") showToast("IoT Sensor Matrix Activated", "🌱");
                if (targetId === "assistant") showToast("AI Care Advisor Ready", "✨");
            }
        });
    });


    /* --------------------------------------
       3. FLOATING TOAST SYSTEM
       -------------------------------------- */
    const toastContainer = document.getElementById("toastContainer");

    function showToast(message, emoji = "🌾", duration = 3500) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `
            <span class="toast-emoji">${emoji}</span>
            <span class="toast-text">${message}</span>
        `;
        toastContainer.appendChild(toast);

        // Slide out and remove
        setTimeout(() => {
            toast.classList.add("removing");
            toast.addEventListener("animationend", () => {
                toast.remove();
            });
        }, duration);
    }


    /* --------------------------------------
       4. WEATHER FORM HANDLER (AJAX SWAP)
       -------------------------------------- */
    const weatherForm = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    
    // Elements to update
    const weatherCity = document.getElementById("weatherCity");
    const weatherStatus = document.getElementById("weatherStatus");
    const weatherWind = document.getElementById("weatherWind");
    const weatherHum = document.getElementById("weatherHum");
    const spraySuitability = document.getElementById("spraySuitability");
    const irrigationNeed = document.getElementById("irrigationNeed");
    const diseaseRisk = document.getElementById("diseaseRisk");
    const agriWeatherAdvice = document.getElementById("agriWeatherAdvice");
    
    // Top metric cards
    const tempMetric = document.querySelector(".analytics-grid .glass-card:nth-child(1) .value");
    const humMetric = document.querySelector(".analytics-grid .glass-card:nth-child(2) .value");
    const windMetric = document.querySelector(".analytics-grid .glass-card:nth-child(3) .value");

    weatherForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (!city) return;

        showToast(`Fetching weather data for ${city}...`, "🔍");

        try {
            // Post form data to home route
            const formData = new FormData();
            formData.append("city", city);

            const response = await fetch("/", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Failed to search");
            
            const htmlText = await response.text();
            
            // Create helper DOM parser to extract updated blocks
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");

            // Replace Weather Hub fields
            const newCity = doc.getElementById("weatherCity").innerText;
            const newStatus = doc.getElementById("weatherStatus").innerText;
            const newWind = doc.getElementById("weatherWind").innerText;
            const newHum = doc.getElementById("weatherHum").innerText;
            
            const newSpray = doc.getElementById("spraySuitability");
            const newIrrig = doc.getElementById("irrigationNeed");
            const newDisease = doc.getElementById("diseaseRisk");
            const newAdvice = doc.getElementById("agriWeatherAdvice").innerText;
            
            // Swap texts
            weatherCity.innerText = newCity;
            weatherStatus.innerText = newStatus;
            weatherWind.innerText = newWind;
            weatherHum.innerText = newHum;
            
            // Update Badges Class and Text
            spraySuitability.innerText = newSpray.innerText;
            spraySuitability.className = newSpray.className;
            
            irrigationNeed.innerText = newIrrig.innerText;
            irrigationNeed.className = newIrrig.className;
            
            diseaseRisk.innerText = newDisease.innerText;
            diseaseRisk.className = newDisease.className;
            
            agriWeatherAdvice.innerText = newAdvice;

            // Swap Top Cards Metrics
            const newTempCard = doc.querySelector(".analytics-grid .glass-card:nth-child(1) .value").innerHTML;
            const newHumCard = doc.querySelector(".analytics-grid .glass-card:nth-child(2) .value").innerHTML;
            const newWindCard = doc.querySelector(".analytics-grid .glass-card:nth-child(3) .value").innerHTML;

            tempMetric.innerHTML = newTempCard;
            humMetric.innerHTML = newHumCard;
            windMetric.innerHTML = newWindCard;

            showToast(`Weather updated for ${city}!`, "✅");
        } catch (err) {
            showToast("Error updating weather. Check connection/city spelling.", "⚠️");
            console.error(err);
        }
    });


    /* --------------------------------------
       5. COMPUTER VISION CROP SCANNER
       -------------------------------------- */
    const cropImage = document.getElementById("cropImage");
    const dropZone = document.getElementById("dropZone");
    const scanHud = document.getElementById("scanHud");
    const previewImage = document.getElementById("previewImage");
    const scanLaser = document.getElementById("scanLaser");
    const scanProgressBar = document.getElementById("scanProgressBar");
    const scanProgressFill = document.getElementById("scanProgressFill");
    const cropTypeSelect = document.getElementById("cropType");
    
    // Results panels
    const scannerResults = document.getElementById("scannerResults");
    const resultsDefaultMsg = document.getElementById("resultsDefaultMsg");
    const resultsActiveCard = document.getElementById("resultsActiveCard");
    
    const resultDiseaseName = document.getElementById("resultDiseaseName");
    const resultStatus = document.getElementById("resultStatus");
    const resultConfidence = document.getElementById("resultConfidence");
    const resultSeverity = document.getElementById("resultSeverity");
    
    const resultSymptoms = document.getElementById("resultSymptoms");
    const resultChemical = document.getElementById("resultChemical");
    const resultBiological = document.getElementById("resultBiological");
    const resultPrevention = document.getElementById("resultPrevention");

    // Canvas overlay for bounding boxes
    const scanCanvas = document.getElementById("scanCanvas");
    const ctx = scanCanvas.getContext("2d");

    let scanResponseData = null; // Cache results for tab changes

    // File selection trigger
    cropImage.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) handleImageFile(file);
    });

    // Drag-and-drop actions
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--accent-color)";
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.style.borderColor = "var(--border-color)";
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--border-color)";
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            handleImageFile(file);
        } else {
            showToast("Please upload a valid image file", "⚠️");
        }
    });

    function handleImageFile(file) {
        // Clear canvas
        ctx.clearRect(0, 0, scanCanvas.width, scanCanvas.height);
        
        // Show scanning overlays
        const fileUrl = URL.createObjectURL(file);
        previewImage.src = fileUrl;
        scanHud.style.display = "flex";
        scanLaser.style.display = "block";
        scanProgressBar.style.display = "block";
        scanProgressFill.style.width = "0%";

        showToast("Starting neural leaf scan...", "🤖");

        // Animate simulated scanning loader
        let progress = 0;
        const scanDuration = 2200; // 2.2 seconds
        const stepTime = 50;
        const steps = scanDuration / stepTime;
        const progressIncrement = 100 / steps;

        const progressInterval = setInterval(() => {
            progress += progressIncrement;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            scanProgressFill.style.width = `${progress}%`;
        }, stepTime);

        // Upload and scan asynchronously
        const formData = new FormData();
        formData.append("crop_image", file);
        formData.append("crop_type", cropTypeSelect.value);

        fetch("/scan", {
            method: "POST",
            body: formData
        })
        .then(res => {
            if (!res.ok) throw new Error("Diagnostic failed");
            return res.json();
        })
        .then(data => {
            // Wait for progress bar animation to hit 100%
            setTimeout(() => {
                scanLaser.style.display = "none";
                scanProgressBar.style.display = "none";
                
                scanResponseData = data;
                renderScanResults(data);
                showToast("Analysis complete!", "✅");
            }, 500);
        })
        .catch(err => {
            clearInterval(progressInterval);
            scanLaser.style.display = "none";
            scanProgressBar.style.display = "none";
            showToast("Server analysis error. Fallback loaded.", "⚠️");
            console.error(err);
        });
    }

    function renderScanResults(data) {
        // Reveal active details layout
        resultsDefaultMsg.style.display = "none";
        resultsActiveCard.classList.remove("hidden");

        // Update fields
        resultDiseaseName.innerText = data.disease;
        resultStatus.innerText = data.status.toUpperCase();
        resultConfidence.innerText = `${data.confidence}% Match`;
        resultSeverity.innerText = `Severity Rating: ${data.details.severity}`;
        
        resultSymptoms.innerText = data.details.symptoms;
        resultChemical.innerText = data.details.chemical;
        resultBiological.innerText = data.details.biological;
        resultPrevention.innerText = data.details.prevention;

        // Apply health color themes to badges
        if (data.status.toLowerCase() === "healthy") {
            resultStatus.className = "status-badge healthy";
            showToast("Leaf health is OPTIMAL", "🌿");
        } else {
            resultStatus.className = "status-badge";
            showToast(`${data.disease} detected! Check tabs.`, "🚨");
        }

        // Draw Bounding Box Overlays
        drawBoundingBox(data.bbox);
    }

    function drawBoundingBox(bbox) {
        if (!bbox) return;

        // Resize Canvas to fit image layout
        scanCanvas.width = previewImage.clientWidth;
        scanCanvas.height = previewImage.clientHeight;

        // Calculate coordinates in pixels based on percentages
        const px = (bbox.x / 100) * scanCanvas.width;
        const py = (bbox.y / 100) * scanCanvas.height;
        const pw = (bbox.w / 100) * scanCanvas.width;
        const ph = (bbox.h / 100) * scanCanvas.height;

        // Draw outer glowing borders
        ctx.strokeStyle = "rgba(255, 23, 68, 0.85)"; // Danger red box
        ctx.lineWidth = 3;
        ctx.setLineDash([4, 4]); // Dashed lines
        ctx.strokeRect(px, py, pw, ph);

        // Draw sharp solid target corners
        ctx.setLineDash([]);
        ctx.strokeStyle = "#ff1744";
        ctx.lineWidth = 4;

        const cornerLen = 14;
        // Top Left
        ctx.beginPath(); ctx.moveTo(px + cornerLen, py); ctx.lineTo(px, py); ctx.lineTo(px, py + cornerLen); ctx.stroke();
        // Top Right
        ctx.beginPath(); ctx.moveTo(px + pw - cornerLen, py); ctx.lineTo(px + pw, py); ctx.lineTo(px + pw, py + cornerLen); ctx.stroke();
        // Bottom Left
        ctx.beginPath(); ctx.moveTo(px, py + ph - cornerLen); ctx.lineTo(px, py + ph); ctx.lineTo(px + cornerLen, py + ph); ctx.stroke();
        // Bottom Right
        ctx.beginPath(); ctx.moveTo(px + pw - cornerLen, py + ph); ctx.lineTo(px + pw, py + ph); ctx.lineTo(px + pw, py + ph - cornerLen); ctx.stroke();

        // Draw detection tags
        ctx.fillStyle = "#ff1744";
        ctx.fillRect(px, py - 24, 110, 24);
        
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.fillText("DISEASE CLUSTER", px + 8, py - 8);
    }

    // Handle scan canvas resize when window scales
    window.addEventListener("resize", () => {
        if (scanResponseData && scanResponseData.bbox && scanHud.style.display === "flex") {
            drawBoundingBox(scanResponseData.bbox);
        }
    });

    // Diagnostics result panel tab selectors
    const resultTabs = document.querySelectorAll(".result-tab");
    const tabContents = document.querySelectorAll(".tab-content");

    resultTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetTab = tab.getAttribute("data-tab");
            
            // Toggle active tabs class
            resultTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Toggle content display
            tabContents.forEach(content => {
                if (content.id === `tab-${targetTab}`) {
                    content.classList.add("active");
                } else {
                    content.classList.remove("active");
                }
            });
        });
    });


    /* --------------------------------------
       6. LIVE TELEMETRY SIMULATOR (IoT Grid)
       -------------------------------------- */
    const iotToggle = document.getElementById("iotToggle");
    const moistureProgress = document.getElementById("moistureProgress");
    const moistureVal = document.getElementById("moistureVal");
    
    const tempProgress = document.getElementById("tempProgress");
    const tempVal = document.getElementById("tempVal");
    
    const phProgress = document.getElementById("phProgress");
    const phVal = document.getElementById("phVal");
    
    const nVal = document.getElementById("nVal");
    const pVal = document.getElementById("pVal");
    const kVal = document.getElementById("kVal");
    
    const nBar = document.getElementById("nBar");
    const pBar = document.getElementById("pBar");
    const kBar = document.getElementById("kBar");

    // Home status variables
    const homeMoisture = document.querySelector(".mini-card.card-one p");

    let telemetryInterval = null;

    iotToggle.addEventListener("change", (e) => {
        if (e.target.checked) {
            showToast("Live IoT telemetry stream connected", "⚡");
            startTelemetrySimulation();
        } else {
            showToast("IoT stream disconnected", "🔌");
            stopTelemetrySimulation();
        }
    });

    function startTelemetrySimulation() {
        // Base seed parameters
        let baseMoist = 68;
        let baseTemp = 27;
        let basePh = 6.5;
        let baseN = 182;
        let baseP = 46;
        let baseK = 210;

        telemetryInterval = setInterval(() => {
            // Introduce slight randomized drifts
            baseMoist += (Math.random() - 0.5) * 1.5;
            baseTemp += (Math.random() - 0.5) * 0.8;
            basePh += (Math.random() - 0.5) * 0.15;
            
            baseN += Math.round((Math.random() - 0.5) * 4);
            baseP += Math.round((Math.random() - 0.5) * 2);
            baseK += Math.round((Math.random() - 0.5) * 5);

            // Clamp bounds
            baseMoist = Math.max(50, Math.min(85, baseMoist));
            baseTemp = Math.max(20, Math.min(35, baseTemp));
            basePh = Math.max(5.5, Math.min(7.5, basePh));
            
            baseN = Math.max(140, Math.min(240, baseN));
            baseP = Math.max(30, Math.min(65, baseP));
            baseK = Math.max(160, Math.min(260, baseK));

            // Render updates in telemetry gauges
            const mPercent = Math.round(baseMoist);
            const tVal = Math.round(baseTemp * 10) / 10;
            const pValRounded = Math.round(basePh * 10) / 10;

            moistureVal.innerText = `${mPercent}%`;
            moistureProgress.style.background = `conic-gradient(var(--accent-color) ${mPercent * 3.6}deg, var(--card-bg-light) 0deg)`;
            
            // Map 20-35 deg to percent for progress circle
            const tempPercent = ((tVal - 15) / 25) * 100;
            tempVal.innerText = `${tVal}°C`;
            tempProgress.style.background = `conic-gradient(var(--info-color) ${tempPercent * 3.6}deg, var(--card-bg-light) 0deg)`;

            // Map pH 5.5-7.5 to percentage
            const phPercent = ((pValRounded - 4.5) / 4) * 100;
            phVal.innerText = `${pValRounded}`;
            phProgress.style.background = `conic-gradient(var(--warning-color) ${phPercent * 3.6}deg, var(--card-bg-light) 0deg)`;

            // Render updates in NPK
            nVal.innerText = `${baseN} ppm`;
            nBar.style.width = `${((baseN - 100) / 150) * 100}%`;
            
            pVal.innerText = `${baseP} ppm`;
            pBar.style.width = `${((baseP - 20) / 60) * 100}%`;
            
            kVal.innerText = `${baseK} ppm`;
            kBar.style.width = `${((baseK - 100) / 200) * 100}%`;

            // Mirror on Dashboard panel card
            if (homeMoisture) {
                homeMoisture.innerText = `${mPercent}.2%`;
            }
        }, 1600);
    }

    function stopTelemetrySimulation() {
        if (telemetryInterval) {
            clearInterval(telemetryInterval);
            telemetryInterval = null;
        }
    }

    // IoT Actuator Grid Handlers
    const actionBtns = document.querySelectorAll(".action-btn");
    actionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const action = btn.getAttribute("data-action");
            const btnText = btn.innerText;

            // Trigger loading spinning state
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none";
            showToast(`Initializing actuator: ${btnText.substring(3)}...`, "⚙️");

            setTimeout(() => {
                btn.style.opacity = "1";
                btn.style.pointerEvents = "auto";
                
                // Confirm action success alerts
                if (action === "drip") showToast("Drip irrigation active: Dispensing 2.5L water", "💧");
                if (action === "npk") showToast("Fertigation complete: Nitrogen levels boosted", "🧪");
                if (action === "fan") showToast("Ventilation active: Air canopy flow set to 3.5 m/s", "💨");
                if (action === "lime") showToast("Lime neutralizer applied. Soil pH stabilizing.", "🪵");
            }, 1800);
        });
    });


    /* --------------------------------------
       7. AI ADVISORY CHAT CONSOLE
       -------------------------------------- */
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatLog = document.getElementById("chatLog");
    const quickPills = document.querySelectorAll(".quick-pill");

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;

        sendMessageToBot(msg);
        chatInput.value = "";
    });

    // Make enter submit, shift-enter break lines
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event("submit"));
        }
    });

    quickPills.forEach(pill => {
        pill.addEventListener("click", () => {
            const query = pill.getAttribute("data-target") || pill.getAttribute("data-query") || pill.innerText;
            chatInput.value = query;
            chatInput.focus();
            // Smoothly scroll down to bottom text field
            chatForm.scrollIntoView({ behavior: "smooth" });
        });
    });

    async function sendMessageToBot(queryText) {
        // Append user bubble
        appendBubble(queryText, "user");
        
        // Append bot loading bubble
        const loadingId = "bot-loading-" + Date.now();
        appendLoadingBubble(loadingId);
        
        try {
            const res = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: queryText })
            });

            if (!res.ok) throw new Error("API failed");
            const data = await res.json();

            // Remove loading indicator
            const loadingBubble = document.getElementById(loadingId);
            if (loadingBubble) loadingBubble.remove();

            // Append bot response with typing streaming animation
            appendBotBubble(data.response);

        } catch (err) {
            const loadingBubble = document.getElementById(loadingId);
            if (loadingBubble) loadingBubble.remove();
            
            appendBubble("Error: I am currently unable to contact the advisory server. Please check your offline connection.", "bot");
            console.error(err);
        }
    }

    function appendBubble(text, sender) {
        const bubble = document.createElement("div");
        bubble.className = `chat-message ${sender}`;
        
        const avatar = sender === "bot" ? "🤖" : "👨‍🌾";
        const contentHtml = sender === "bot" ? parseMarkdown(text) : `<p>${text}</p>`;

        bubble.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-body">${contentHtml}</div>
        `;
        
        chatLog.appendChild(bubble);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function appendLoadingBubble(id) {
        const bubble = document.createElement("div");
        bubble.className = "chat-message bot";
        bubble.id = id;
        bubble.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-body">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatLog.appendChild(bubble);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function appendBotBubble(rawText) {
        const bubble = document.createElement("div");
        bubble.className = "chat-message bot";
        
        bubble.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-body"></div>
        `;
        
        chatLog.appendChild(bubble);
        chatLog.scrollTop = chatLog.scrollHeight;
        
        const body = bubble.querySelector(".message-body");
        
        // Convert markdown to HTML layout
        const fullHtml = parseMarkdown(rawText);
        
        // Stream text dynamically word-by-word
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = fullHtml;
        
        // Simple type stream effect by appending parsed contents in nodes
        let nodes = Array.from(tempDiv.childNodes);
        let nodeIndex = 0;
        
        function appendNextNode() {
            if (nodeIndex < nodes.length) {
                const nodeClone = nodes[nodeIndex].cloneNode(true);
                body.appendChild(nodeClone);
                nodeIndex++;
                chatLog.scrollTop = chatLog.scrollHeight;
                setTimeout(appendNextNode, 90);
            }
        }
        
        appendNextNode();
    }

    // Markdown Parser
    function parseMarkdown(text) {
        let html = text;
        
        // Parse Headers (e.g. ### Header)
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Parse Blockquotes (e.g. > Quote)
        html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');
        
        // Parse Bold (e.g. **text**)
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Parse Italics (e.g. *text*)
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Parse Unordered Lists (e.g. * Item)
        html = html.replace(/^\s*[\*\-]\s+(.*)$/gim, '<li>$1</li>');
        
        // Parse Tables (e.g. | Cell | Cell |)
        const lines = html.split('\n');
        let inTable = false;
        let tableHtml = '<table>';
        let processedLines = [];
        
        for (let line of lines) {
            if (line.trim().startsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    tableHtml = '<table>';
                }
                
                const cols = line.split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1);
                
                // Skip dashes dividers | :--- | :--- |
                if (line.includes(':---') || line.includes('---:')) {
                    continue;
                }
                
                const isHeader = !tableHtml.includes('<thead>') && inTable && !tableHtml.includes('<tbody>');
                if (isHeader) {
                    tableHtml += '<thead><tr>' + cols.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
                } else {
                    tableHtml += '<tr>' + cols.map(c => `<td>${c}</td>`).join('') + '</tr>';
                }
            } else {
                if (inTable) {
                    inTable = false;
                    tableHtml += '</tbody></table>';
                    processedLines.push(tableHtml);
                }
                processedLines.push(line);
            }
        }
        if (inTable) {
            tableHtml += '</tbody></table>';
            processedLines.push(tableHtml);
        }
        
        html = processedLines.join('\n');
        
        // Clean list tags wrap
        html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
        html = html.replace(/<\/ul>\s*<ul>/g, '');
        
        // Clean newlines spacing
        html = html.replace(/\n\n/g, '<br>');
        
        return html;
    }

});