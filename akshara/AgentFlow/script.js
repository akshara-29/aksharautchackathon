/* ==========================================
   AgentFlow - App 2 JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".section");
    const pageTitle = document.getElementById("pageTitle");

    const modal = document.getElementById("workflowModal");
    const toast = document.getElementById("toast");

    /* ==========================================
       PAGE TITLES
    ========================================== */

    const titles = {
        overview: "Automation Overview",
        workflows: "All Workflows",
        builder: "Workflow Builder",
        agents: "AI Agent Network",
        runs: "Workflow Runs",
        approvals: "Human Approvals",
        errors: "Errors & Retry",
        integrations: "Integrations",
        settings: "Settings"
    };


    /* ==========================================
       SIDEBAR NAVIGATION
    ========================================== */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const sectionName = item.dataset.section;

            if (!sectionName) {
                return;
            }

            showSection(sectionName);

        });

    });


    /* ==========================================
       SHOW SECTION
    ========================================== */

    window.showSection = function(sectionName) {

        sections.forEach(section => {
            section.classList.remove("active");
        });

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        const selectedSection = document.getElementById(sectionName);

        if (selectedSection) {
            selectedSection.classList.add("active");
        }

        const selectedNav = document.querySelector(
            `.nav-item[data-section="${sectionName}"]`
        );

        if (selectedNav) {
            selectedNav.classList.add("active");
        }

        if (pageTitle && titles[sectionName]) {
            pageTitle.textContent = titles[sectionName];
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    /* ==========================================
       MODAL
    ========================================== */

    window.openModal = function() {

        if (!modal) {
            return;
        }

        modal.classList.add("show");

        const nameInput = document.getElementById("workflowName");

        if (nameInput) {
            setTimeout(() => {
                nameInput.focus();
            }, 100);
        }

    };


    window.closeModal = function() {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

    };


    /* ==========================================
       CLOSE MODAL WHEN CLICKING OUTSIDE
    ========================================== */

    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal();
            }

        });

    }


    /* ==========================================
       ESC KEY
    ========================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* ==========================================
       CREATE WORKFLOW
    ========================================== */

    window.createWorkflow = function() {

        const nameInput = document.getElementById("workflowName");

        if (!nameInput) {
            return;
        }

        const workflowName = nameInput.value.trim();

        if (workflowName === "") {

            nameInput.style.borderColor = "#ef4444";

            showToast("Please enter a workflow name");

            setTimeout(() => {
                nameInput.style.borderColor = "";
            }, 1500);

            return;
        }

        closeModal();

        nameInput.value = "";

        showToast(
            `"${workflowName}" workflow created successfully`
        );

        setTimeout(() => {
            showSection("workflows");
        }, 700);

    };


    /* ==========================================
       TOAST
    ========================================== */

    window.showToast = function(message) {

        if (!toast) {
            return;
        }

        toast.textContent = "✓ " + message;

        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    };


    /* ==========================================
       APPROVAL BUTTONS
    ========================================== */

    const approveButtons = document.querySelectorAll(".approve");

    approveButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".approval-card");

            if (card) {

                card.style.opacity = "0";

                card.style.transform = "translateX(30px)";

                card.style.transition = "0.3s ease";

                setTimeout(() => {
                    card.remove();
                }, 300);

            }

            showToast("Approval completed");

        });

    });


    const rejectButtons = document.querySelectorAll(".reject");

    rejectButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".approval-card");

            if (card) {

                card.style.opacity = "0";

                card.style.transform = "translateX(-30px)";

                card.style.transition = "0.3s ease";

                setTimeout(() => {
                    card.remove();
                }, 300);

            }

            showToast("Request rejected");

        });

    });


    /* ==========================================
       RETRY BUTTONS
    ========================================== */

    const retryButtons = document.querySelectorAll(".retry-btn");

    retryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".error-card");

            if (card) {

                button.textContent = "Retrying...";

                button.disabled = true;

                setTimeout(() => {

                    card.style.opacity = "0";

                    card.style.transform = "translateX(30px)";

                    card.style.transition = "0.3s ease";

                    setTimeout(() => {
                        card.remove();
                    }, 300);

                }, 900);

            }

            showToast("Workflow retry started");

        });

    });


    /* ==========================================
       SEARCH
    ========================================== */

    const searchInput = document.querySelector(".search input");

    if (searchInput) {

        searchInput.addEventListener("input", event => {

            const searchText =
                event.target.value.toLowerCase().trim();

            const workflowRows =
                document.querySelectorAll(".workflow-row");

            workflowRows.forEach(row => {

                const text =
                    row.textContent.toLowerCase();

                if (text.includes(searchText)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        });

    }


    /* ==========================================
       KEYBOARD SHORTCUT
       Ctrl/Cmd + K
    ========================================== */

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (searchInput) {
                searchInput.focus();
            }

        }

    });


    /* ==========================================
       NOTIFICATION BUTTON
    ========================================== */

    const notificationButton =
        document.querySelector(".notification-btn");

    if (notificationButton) {

        notificationButton.addEventListener("click", () => {

            showToast(
                "You have 3 pending workflow approvals"
            );

        });

    }


    /* ==========================================
       SAVE DRAFT
    ========================================== */

    const secondaryButtons =
        document.querySelectorAll(".secondary-btn");

    secondaryButtons.forEach(button => {

        if (
            button.textContent.trim().toLowerCase()
            .includes("save draft")
        ) {

            button.addEventListener("click", () => {

                showToast(
                    "Workflow draft saved successfully"
                );

            });

        }

    });


    /* ==========================================
       RUN TEST
    ========================================== */

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        if (
            button.textContent.trim()
            .toLowerCase()
            .includes("run test")
        ) {

            button.addEventListener("click", () => {

                showToast(
                    "Workflow test execution started"
                );

            });

        }

    });


    /* ==========================================
       SAVE CONFIGURATION
    ========================================== */

    const configButtons =
        document.querySelectorAll(".node-settings .create-btn");

    configButtons.forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "Agent configuration saved"
            );

        });

    });


    /* ==========================================
       INTEGRATION CLICK
    ========================================== */

    const integrations =
        document.querySelectorAll(".integration");

    integrations.forEach(integration => {

        integration.addEventListener("click", () => {

            const name =
                integration.querySelector("strong");

            if (name) {

                showToast(
                    `${name.textContent} integration selected`
                );

            }

        });

    });


    /* ==========================================
       WORKFLOW CARD CLICK
    ========================================== */

    const workflowCards =
        document.querySelectorAll(".workflow-card");

    workflowCards.forEach(card => {

        card.addEventListener("click", () => {

            const title =
                card.querySelector("h3");

            if (title) {

                showToast(
                    `${title.textContent} selected`
                );

            }

        });

    });


    /* ==========================================
       AGENT CARD CLICK
    ========================================== */

    const agentCards =
        document.querySelectorAll(".agent-large");

    agentCards.forEach(card => {

        card.addEventListener("click", () => {

            const title =
                card.querySelector("h3");

            if (title) {

                showToast(
                    `${title.textContent} selected`
                );

            }

        });

    });


    /* ==========================================
       RANGE INPUT
    ========================================== */

    const temperature =
        document.querySelector(
            '.node-settings input[type="range"]'
        );

    if (temperature) {

        temperature.addEventListener("input", () => {

            const value =
                Math.round(
                    Number(temperature.value) / 10
                );

            temperature.title =
                `Temperature: ${value / 10}`;

        });

    }


    /* ==========================================
       AUTO UPDATE LIVE PROGRESS
    ========================================== */

    const progressBars =
        document.querySelectorAll(".execution .progress div");

    setInterval(() => {

        progressBars.forEach(bar => {

            const currentWidth =
                parseFloat(bar.style.width);

            if (currentWidth < 95) {

                const newWidth =
                    currentWidth + Math.random() * 2;

                bar.style.width =
                    Math.min(newWidth, 95) + "%";

            }

        });

    }, 2500);


    /* ==========================================
       INITIAL STATE
    ========================================== */

    showSection("overview");

});