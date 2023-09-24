import { danger, fail, warn, message } from "danger";
const bigPRThreshold = 600;
let errorCount = 0;

console.log("Starting Danger evaluation...");

// Rest of your Dangerfile...

// Check for modified files
if (danger.git.modified_files.length === 0) {
  message("No files were modified. Are you sure this PR is necessary?");
}

// Check for a specific label
const hasDocumentationLabel = danger.github.issue.labels.some(
  (label) => label.name === "documentation"
);

if (!hasDocumentationLabel) {
  warn("This PR may require documentation updates.");
}
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(":exclamation: Big PR (" + ++errorCount + ")");
  markdown(
    "> (" +
      errorCount +
      ") : Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review."
  );
}

console.log("Danger evaluation completed.");
