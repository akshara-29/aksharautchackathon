```javascript
document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("pageTitle");

    const titles = {
        dashboard: "AI Agent Dashboard",
        agents: "AI Agents",
        tasks: "Agent Task Queue",
        activity: "Activity Log",
        history: "Execution History",
        builder: "Agent Builder",
        approvals: "Approval Center",
        settings: "Agent Configuration"
    };


    /* =========================
       PAGE NAVIGATION
    ========================== */

    function showPage(pageId) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const target = document.getElementById(pageId);

        if (target) {
            target.classList.add("active");
        }


        navItems.forEach(item => {
            item.classList.remove("active");

            if (item.dataset.page === pageId) {
                item.classList.add("active");
            }
        });


        if (pageTitle && titles[pageId]) {
            pageTitle.textContent = titles[pageId];
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* Sidebar navigation */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const page = item.dataset.page;

            if (page) {
                showPage(page);
            }

        });

    });


    /* Buttons that link to pages */

    document.querySelectorAll("[data-page-link]").forEach(button => {

        button.addEventListener("click", () => {

            const page = button.dataset.pageLink;

            showPage(page);

        });

    });


    /* =========================
       CREATE AGENT MODAL
    ========================== */

    const modal = document.getElementById("agentModal");
    const openBuilder = document.getElementById("openBuilder");
    const closeModal = document.getElementById("closeModal");


    if (openBuilder) {

        openBuilder.addEventListener("click", () => {

            modal.classList.add("show");

        });

    }


    if (closeModal) {

        closeModal.addEventListener("click", () => {

            modal.classList.remove("show");

        });

    }


    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                modal.classList.remove("show");
            }

        });

    }


    /* =========================
       APPROVAL BUTTONS
    ========================== */

    document.querySelectorAll(".approve").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".approval-card");

            if (!card) return;

            card.style.opacity = "0.5";

            button.textContent = "Approved ✓";

            button.disabled = true;

            const rejectButton =
                card.querySelector(".reject");

            if (rejectButton) {
                rejectButton.disabled = true;
            }

        });

    });


    document.querySelectorAll(".reject").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".approval-card");

            if (!card) return;

            card.style.opacity = "0.5";

            button.textContent = "Rejected";

            button.disabled = true;

            const approveButton =
                card.querySelector(".approve");

            if (approveButton) {
                approveButton.disabled = true;
            }

        });

    });


    /* =========================
       AGENT CREATION
    ========================== */

    document
        .querySelector(".modal-content .primary-btn")
        ?.addEventListener("click", () => {

            const inputs =
                document.querySelectorAll(".modal-content input");

            const agentName =
                inputs[0]?.value.trim();

            if (!agentName) {

                alert("Please enter an agent name.");

                return;
            }


            alert(
                `${agentName} has been created successfully.`
            );


            modal.classList.remove("show");


            inputs.forEach(input => {
                input.value = "";
            });

        });


    /* =========================
       SEARCH TASKS
    ========================== */

    const searchInput =
        document.querySelector(".toolbar input");

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const query =
                searchInput.value.toLowerCase();

            document
                .querySelectorAll("tbody tr")
                .forEach(row => {

                    row.style.display =
                        row.textContent
                            .toLowerCase()
                            .includes(query)
                            ? ""
                            : "none";

                });

        });

    }


    /* =========================
       AGENT CARD INTERACTION
    ========================== */

    document
        .querySelectorAll(".agent-card .secondary-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".agent-card");

                const name =
                    card.querySelector("h3")?.textContent;

                alert(
                    `${name} profile selected.`
                );

            });

        });


    /* =========================
       KEYBOARD SHORTCUT
    ========================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (modal) {
                modal.classList.remove("show");
            }

        }

    });

});
```
