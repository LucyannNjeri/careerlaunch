const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("search");
const emptyState = document.getElementById("emptyState");

let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// initial render
renderJobs();

// ADD JOB
jobForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;

  const job = {
    id: Date.now(),
    company,
    role,
    date,
    status
  };

  jobs.push(job);
  saveJobs();
  renderJobs();
  jobForm.reset();
});

// RENDER JOBS
function renderJobs(filteredJobs = jobs) {
  jobList.innerHTML = "";

  // EMPTY STATE CONTROL
  if (filteredJobs.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  // CREATE JOB CARDS
  filteredJobs.forEach(job => {
    const div = document.createElement("div");
    div.classList.add("job-card");

    div.innerHTML = `
      <h3>${job.company}</h3>
      <p>${job.role}</p>
      <p>Applied: ${job.date}</p>
      <span class="status ${job.status}">${job.status}</span>
      <br>
      <button class="delete-btn" onclick="deleteJob(${job.id})">Delete</button>
    `;

    jobList.appendChild(div);
  });

  updateStats();
}

// DELETE JOB
function deleteJob(id) {
  jobs = jobs.filter(job => job.id !== id);
  saveJobs();
  renderJobs();
}

// SAVE TO LOCALSTORAGE
function saveJobs() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

// UPDATE DASHBOARD STATS
function updateStats() {
  document.getElementById("totalApps").textContent = jobs.length;

  document.getElementById("interviews").textContent =
    jobs.filter(job => job.status === "Interview").length;

  document.getElementById("offers").textContent =
    jobs.filter(job => job.status === "Offer").length;
}

// SEARCH FUNCTION
searchInput.addEventListener("input", function () {
  const value = searchInput.value.toLowerCase();

  const filtered = jobs.filter(job =>
    job.company.toLowerCase().includes(value)
  );

  renderJobs(filtered);
});