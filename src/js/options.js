(function () {
    const DEFAULT_JIRA_ISSUE_BASE_URL_SUFFIX = '.atlassian.net/browse';
    let hasEnteredJiraIssueBaseUrl = false;

    // Saves options to chrome.storage.sync.
    function saveOptions() {
        const companyPrefix = document.getElementById('company_prefix').value;
        const jiraIssueBaseUrl = document.getElementById(
            'jira_issue_base_url'
        ).value;
        chrome.storage.sync.set(
            {
                companyPrefix: companyPrefix,
                jiraIssueBaseUrl: jiraIssueBaseUrl,
            },
            function () {
                // Update status to let user know options were saved.
                document.getElementById('status').innerHTML = 'Options saved.';
            }
        );
    }

    // Restores option values state using the preferences
    // stored in chrome.storage.
    function restoreOptions() {
        chrome.storage.sync.get(
            {
                companyPrefix: '',
                jiraIssueBaseUrl: '',
            },
            function (items) {
                document.getElementById('company_prefix').value =
                    items.companyPrefix;
                hasEnteredJiraIssueBaseUrl = !!items.jiraIssueBaseUrl;
                document.getElementById('jira_issue_base_url').value =
                    items.jiraIssueBaseUrl;
            }
        );
    }

    function initEventHandlers() {
        document.querySelector('#save').addEventListener('click', saveOptions);
        document
            .querySelector('#company_prefix')
            .addEventListener('change', function () {
                let jiraIssueBaseUrl = document.getElementById(
                    'jira_issue_base_url'
                ).value;
                if (
                    !hasEnteredJiraIssueBaseUrl ||
                    !jiraIssueBaseUrl.match(/^https?:\/\/.*/)
                ) {
                    jiraIssueBaseUrl = `https://${
                        document.getElementById('company_prefix').value
                    }${DEFAULT_JIRA_ISSUE_BASE_URL_SUFFIX}`;
                    document.getElementById('jira_issue_base_url').value =
                        jiraIssueBaseUrl;
                }
            });
    }

    function init() {
        restoreOptions();
    }

    initEventHandlers();
    init();
})();
