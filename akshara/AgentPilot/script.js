document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".section");
    const pageTitle = document.getElementById("pageTitle");
    const searchInput = document.getElementById("searchInput");
    const modal = document.getElementById("agentModal");
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    const titles = {
        dashboard: "Agent Dashboard",
        agents: "AI Agents",
        activity: "Live Activity",
        executions: "Agent Executions",
        tasks: "Task Queue",
        approvals: "Approval Center",
        errors: "Errors & Recovery",
        analytics: "Agent Analytics",
        settings: "Settings"
    };


    /* =========================
       NAVIGATION
    ========================= */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const sectionName = item.dataset.section;

            showSection(sectionName);

        });

    });


    window.showSection = function(sectionName) {

        sections.forEach(section => {
            section.classList.remove("active");
        });

        navItems.forEach(item => {
            item.classList.remove("active");
        });

        const target = document.getElementById(sectionName);
        const nav = document.querySelector(
            `.nav-item[data-section="${sectionName}"]`
        );

        if (target) {
            target.classList.add("active");
        }

        if (nav) {
            nav.classList.add("active");
        }

        if (pageTitle && titles[sectionName]) {
            pageTitle.textContent = titles[sectionName];
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    /* =========================
       TOAST
    ========================= */

    let toastTimer;

    window.showToast = function(message) {

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);

    };


    /* =========================
       CREATE AGENT MODAL
    ========================= */

    window.openAgentModal = function() {

        if (!modal) return;

        modal.classList.add("show");

        setTimeout(() => {
            const nameInput = document.getElementById("agentName");

            if (nameInput) {
                nameInput.focus();
            }
        }, 100);

    };


    window.closeAgentModal = function() {

        if (!modal) return;

        modal.classList.remove("show");

    };


    window.createAgent = function() {

        const nameInput = document.getElementById("agentName");
        const typeInput = document.getElementById("agentType");
        const descriptionInput =
            document.getElementById("agentDescription");

        const name = nameInput.value.trim();
        const type = typeInput.value;
        const description = descriptionInput.value.trim();

        if (!name) {

            showToast("Please enter an agent name.");

            nameInput.focus();

            return;
        }

        showToast(`${name} created successfully.`);

        nameInput.value = "";
        descriptionInput.value = "";

        closeAgentModal();

        setTimeout(() => {

            showSection("agents");

        }, 300);

    };


    /* Close modal by clicking outside */

    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeAgentModal();
            }

        });

    }


    /* Escape key */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeAgentModal();
        }

    });


    /* =========================
       SEARCH
    ========================= */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const query = searchInput.value
                .trim()
                .toLowerCase();

            const agentCards =
                document.querySelectorAll(".agent-card");

            agentCards.forEach(card => {

                const text = card.textContent.toLowerCase();

                card.style.display =
                    text.includes(query) ? "" : "none";

            });

            const healthRows =
                document.querySelectorAll(".health-row");

            healthRows.forEach(row => {

                const text = row.textContent.toLowerCase();

                row.style.display =
                    text.includes(query) ? "" : "none";

            });

        });

    }


    /* =========================
       KEYBOARD SEARCH
    ========================= */

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


    /* =========================
       NOTIFICATIONS
    ========================= */

    const notificationBtn =
        document.getElementById("notificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            showToast(
                "You have 3 pending approval requests."
            );

            setTimeout(() => {
                showSection("approvals");
            }, 700);

        });

    }


    /* =========================
       APPROVALS
    ========================= */

    document.querySelectorAll(".approve-btn").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".approval-card");

            if (card) {

                const title =
                    card.querySelector("h3")?.textContent ||
                    "Approval";

                card.style.opacity = "0.4";

                setTimeout(() => {
                    card.remove();
                }, 300);

                showToast(`${title} approved.`);

            }

        });

    });


    document.querySelectorAll(".reject-btn").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".approval-card");

            if (card) {

                const title =
                    card.querySelector("h3")?.textContent ||
                    "Approval";

                card.style.opacity = "0.4";

                setTimeout(() => {
                    card.remove();
                }, 300);

                showToast(`${title} rejected.`);

            }

        });

    });


    document.querySelectorAll(".approve-small").forEach(button => {

        button.addEventListener("click", () => {

            showSection("approvals");

            showToast("Opening approval request...");

        });

    });


    /* =========================
       RETRY FAILED TASKS
    ========================= */

    document.querySelectorAll(".retry-btn").forEach(button => {

        button.addEventListener("click", () => {

            const originalText = button.textContent;

            button.textContent = "Retrying...";
            button.disabled = true;

            setTimeout(() => {

                const row = button.closest(".error-row");

                if (row) {

                    row.style.opacity = "0.4";

                    setTimeout(() => {
                        row.remove();
                    }, 350);

                }

                showToast("Execution retry started.");

            }, 1200);

            setTimeout(() => {

                button.textContent = originalText;
                button.disabled = false;

            }, 1500);

        });

    });


    /* =========================
       TASK QUEUE
    ========================= */

    document.querySelectorAll(".run-btn").forEach(button => {

        button.addEventListener("click", () => {

            const taskRow = button.closest(".task-row");

            const taskName =
                taskRow?.querySelector("strong")?.textContent ||
                "Task";

            button.textContent = "Running";
            button.disabled = true;

            showToast(`${taskName} started.`);

            setTimeout(() => {

                if (button) {
                    button.textContent = "Running ✓";
                }

            }, 1000);

        });

    });


    /* =========================
       AGENT CARDS
    ========================= */

    document.querySelectorAll(".agent-action").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".agent-card");

            const agentName =
                card?.querySelector("h3")?.textContent ||
                "Agent";

            showToast(`Opening ${agentName}...`);

        });

    });


    /* =========================
       AGENT HEALTH ROWS
    ========================= */

    document.querySelectorAll(".health-row").forEach(row => {

        row.style.cursor = "pointer";

        row.addEventListener("click", () => {

            const name =
                row.querySelector("strong")?.textContent ||
                "Agent";

            showToast(`${name} selected.`);

        });

    });


    /* =========================
       LIVE EXECUTION SIMULATION
    ========================= */

    const executionItems =
        document.querySelectorAll(".execution-item");

    executionItems.forEach(item => {

        const progressBar =
            item.querySelector(".progress div");

        const percentage =
            item.querySelector(".execution-time");

        if (!progressBar || !percentage) return;

        let value =
            parseInt(
                progressBar.style.width,
                10
            ) || 50;

        const interval =
            setInterval(() => {

                value += Math.floor(Math.random() * 3);

                if (value >= 100) {

                    value = 100;

                    clearInterval(interval);

                    percentage.textContent = "Done";

                    setTimeout(() => {

                        progressBar.style.width = "15%";
                        percentage.textContent = "15%";

                    }, 1200);

                } else {

                    progressBar.style.width =
                        `${value}%`;

                    percentage.textContent =
                        `${value}%`;

                }

            }, 2500);

    });


    /* =========================
       LIVE ACTIVITY
    ========================= */

    setInterval(() => {

        const liveLabel =
            document.querySelector(".live-label");

        if (!liveLabel) return;

        liveLabel.style.opacity =
            liveLabel.style.opacity === "0.45"
                ? "1"
                : "0.45";

    }, 900);


    /* =========================
       SETTINGS
    ========================= */

    document.querySelectorAll(".save-btn").forEach(button => {

        button.addEventListener("click", () => {

            showToast("Settings saved successfully.");

        });

    });


    /* =========================
       PERFORMANCE BARS
    ========================= */

    document.querySelectorAll(".bar").forEach(bar => {

        bar.addEventListener("mouseenter", () => {

            bar.style.transform = "translateY(-5px)";

        });

        bar.addEventListener("mouseleave", () => {

            bar.style.transform = "translateY(0)";

        });

    });


    /* =========================
       WORKSPACE BUTTON
    ========================= */

    const workspaceBtn =
        document.querySelector(".workspace-btn");

    if (workspaceBtn) {

        workspaceBtn.addEventListener("click", () => {

            showToast("Production workspace selected.");

        });

    }


    /* =========================
       INITIAL STATE
    ========================= */

    showSection("dashboard");

});